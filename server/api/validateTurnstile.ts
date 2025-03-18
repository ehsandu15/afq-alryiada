export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);

  console.count(token);
  if (!token) {
    throw createError({
      statusCode: 422,
      statusMessage: "Token not provided.",
    });
  }

  const response = await verifyTurnstileToken(token);
  console.log(response);
  return response;
});
