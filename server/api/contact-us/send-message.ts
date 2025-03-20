import { SEND_MESSAGE_RESPONSE } from "~/constants/send-message-response";
import {
  getIpInfo,
  getMessageByEmail,
  isOldRecord,
  sendMessage,
} from "~/server/utils/send-message-helpers";
import { MessageBody } from "~/types/send-message-api";

export default defineEventHandler(async (event) => {
  const runtimeConf = useRuntimeConfig();

  try {
    const body = await readBody<MessageBody>(event);
    const ipInfo = await getIpInfo();
    const messageDelay =
      parseInt(runtimeConf.public.messageSend.duplicatedMessageDelayDays) || 1;

    // ✅ التحقق من الرسائل السابقة بشكل أفضل
    const message = await getMessageByEmail(body.email);

    if (message?.data?.length > 0) {
      const isOldMsg = isOldRecord(message.data[0].createdAt, messageDelay);

      if (!isOldMsg) {
        return createError({
          statusCode: 400,
          message: SEND_MESSAGE_RESPONSE.DUPLICATED_USER_EMAIL,
          statusMessage: SEND_MESSAGE_RESPONSE.DUPLICATED_USER_EMAIL,
        });
      }
    }

    if (!ipInfo) {
      console.error("Failed to retrieve IP information");
    }

    const createdMessage = await sendMessage({
      ...body,
      ipV4: ipInfo?.ipAddress,
      location: {
        country: ipInfo?.country.names.fa || ipInfo?.country.names.en,
        city: ipInfo?.city.names.fa || ipInfo?.city.names.en,
      },
    });

    if (!createdMessage.success) {
      return createError({
        statusCode: createdMessage.statusCode,
        message: createdMessage.message,
      });
    }

    return {
      message: SEND_MESSAGE_RESPONSE.SEND_SUCCESS,
      success: true,
      details: null,
    };
  } catch (error: any) {
    console.error("❌ Error:", error);
    return createError({
      statusCode: error.statusCode || 500,
      message: error.message || SEND_MESSAGE_RESPONSE.SOMETHING,
      statusMessage: error.message || SEND_MESSAGE_RESPONSE.SOMETHING,
    });
  }
});
