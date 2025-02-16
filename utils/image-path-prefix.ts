export default function imagePathPrefix(
  imagePath: string | undefined,
): string | undefined {
  const {
    public: { strapi },
  } = useRuntimeConfig();
  try {
    if (!imagePath) {
      console.error("Image path not provided");
      return undefined;
    }
    if (typeof imagePath !== "string") {
      console.warn(
        `Path URL Should be string type ,got path type ${typeof imagePath}`,
      );
      return undefined;
    }
    return `${strapi.url}${imagePath}`;
  } catch (error) {
    return undefined;
  }
}
