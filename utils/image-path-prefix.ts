export default function imagePathPrefix(imagePath: string): string {
  const {
    public: { strapi },
  } = useRuntimeConfig();
  try {
    if (!imagePath) {
      console.error("Image path not provided");
      return `${strapi.url}/`;
    }
    if (typeof imagePath !== "string") {
      console.error(
        `Path URL Should be string type ,got path type ${typeof imagePath}`,
      );
      return `${strapi.url}/`;
    }
    return `${strapi.url}${imagePath}`;
  } catch (error) {
    return `${strapi.url}/`;
  }
}
