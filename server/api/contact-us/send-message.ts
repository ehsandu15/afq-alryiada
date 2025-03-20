import { STRAPI_ENDPOINT } from "~/constants/strapi-endpoints";
import ipify from "ipify";
import { GeoData } from "~/types/find-api";
import type { ContactRequestType, MessageBody } from "~/types/send-message-api";
import { SEND_MESSAGE_RESPONSE } from "~/constants/send-message-response";

const findIpInfoBaseUrl = "https://api.findip.net";

function isOldRecord(createdAt: string, expiredInDays?: number): boolean {
  const createdDate: Date = new Date(createdAt);
  const now: Date = new Date();
  const diffInMs: number = now.getTime() - createdDate.getTime();
  const diffInDays: number = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays > (expiredInDays || 3);
}

const getIpInfo = async () => {
  const runtimeConf = useRuntimeConfig();
  const ipAddress = await ipify({ useIPv6: false });

  let ipInfoData: null | GeoData = null;
  if (ipAddress) {
    const ipInfoResponse = await fetch(
      `${findIpInfoBaseUrl}/${ipAddress}/?token=${runtimeConf.findIp.apiKey}`,
    );
    if (!ipInfoResponse.ok) {
      ipInfoData = null;
      console.error(
        ipInfoResponse.statusText || "No data received from findip.net",
      );
    }
    const data = (await ipInfoResponse.json()) as GeoData;
    return { ...data, ipAddress };
  } else {
    console.error("No IP address found");
    return null;
  }
};

const sendMessage = async (body: MessageBody) => {
  const runtimeConf = useRuntimeConfig();
  const url = `${runtimeConf.strapi.url}/api/${STRAPI_ENDPOINT.SEND_MESSAGE}`;

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      data: {
        ...body,
        location: `${body?.location.city} ,${body?.location.country}`,
        ipV4: body.ipV4,
      },
    }),
    headers: {
      Authorization: `Bearer ${runtimeConf.public.strapi.strapiRoleApiKey}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(SEND_MESSAGE_RESPONSE.SEND_MESSAGE_ERROR);
  }
  return true;
};

const getMessageByEmail = async (email: string) => {
  const runtimeConf = useRuntimeConfig();

  const isExistMessageRes = await fetch(
    `${runtimeConf.strapi.url}/api/${STRAPI_ENDPOINT.SEND_MESSAGE}/?filters[email][$eqi]=${email}`,
    {
      headers: {
        Authorization: `Bearer ${runtimeConf.public.strapi.strapiRoleApiKey}`,
      },
    },
  );
  const messageData = await isExistMessageRes.json();

  return messageData as null | { data: ContactRequestType[] };
};

export default defineEventHandler(async (event) => {
  const runtimeConf = useRuntimeConfig();
  try {
    const body = await readBody<MessageBody>(event);
    const ipInfo = await getIpInfo();
    const messageDelay =
      parseInt(runtimeConf.public.messageSend.duplicatedMessageDelayDays) || 1;

    // check is exist message with same email and not passed 3 days
    const message = await getMessageByEmail(body.email);
    const hasPreviousMessage =
      Array.isArray(message?.data) && message?.data?.length > 0;

    if (hasPreviousMessage) {
      const isOldMsg = isOldRecord(message?.data[0]?.createdAt, messageDelay);
      if (isOldMsg) {
        return createError({
          statusCode: 400,
          data: null,
          message: SEND_MESSAGE_RESPONSE.DUPLICATED_USER_EMAIL,
          statusMessage: SEND_MESSAGE_RESPONSE.DUPLICATED_USER_EMAIL,
          name: SEND_MESSAGE_RESPONSE.DUPLICATED_USER_EMAIL,
        });
      }
    }
    // end check

    if (!ipInfo) {
      console.error("No IP address found");
    }

    await sendMessage({
      ...body,
      ipV4: ipInfo?.ipAddress,
      location: {
        country: ipInfo?.country.names.fa || ipInfo?.country.names.en,
        city: ipInfo?.city.names.fa || ipInfo?.city.names.en,
      },
    });

    return {
      message: SEND_MESSAGE_RESPONSE.SEND_SUCCESS,
      success: true,
      details: null,
    };
  } catch (error: any) {
    console.error("Error:", error.message);
    return createError({
      statusCode: error.statusCode || 500,
      data: null,
      message: error.message || SEND_MESSAGE_RESPONSE.SOMETHING,
      statusMessage: error.message || SEND_MESSAGE_RESPONSE.SOMETHING,
      name: error.message || SEND_MESSAGE_RESPONSE.SOMETHING,
    });
  }
});
