import { STRAPI_ENDPOINT } from "~/constants/strapi-endpoints";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const runtimeConf = useRuntimeConfig();

  try {
    const res = await fetch(
      `${runtimeConf.strapi.url}/api/${STRAPI_ENDPOINT.SEND_MESSAGE}`,
      {
        method: "POST",
        body: JSON.stringify({ data: body }),
        headers: {
          // Authorization: `Bearer ${runtimeConf.public.strapi.strapiRoleApiKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error(res.statusText || "No data received from Strapi");
    }
    return {
      message: "message sent successfully",
      success: true,
      details: null,
    };
  } catch (err) {
    return {
      message: "something went wrong while send the message",
      details: err.message,
      success: false,
    };
  }
});
