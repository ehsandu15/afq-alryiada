import ipify from "ipify";
import { STRAPI_ENDPOINT } from "~/constants/strapi-endpoints";
import { GeoData } from "~/types/find-api";
import { ContactRequestType, MessageBody } from "~/types/send-message-api";

const findIpInfoBaseUrl = "https://api.findip.net";

export function isOldRecord(
  createdAt: string,
  expiredInDays?: number,
): boolean {
  const createdDate: Date = new Date(createdAt);
  const now: Date = new Date();
  const diffInMs: number = now.getTime() - createdDate.getTime();
  const diffInDays: number = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays > (expiredInDays || 3);
}

export const getIpInfo = async () => {
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

export const sendMessage = async (body: MessageBody) => {
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
    return {
      message: res.statusText,
      statusCode: res.status,
      success: false,
    };
  }
  return {
    message: res.statusText,
    statusCode: res.status,
    success: true,
  };
};

export const getMessageByEmail = async (email: string) => {
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
