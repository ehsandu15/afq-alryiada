import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const appWindow = typeof window === "undefined" ? new JSDOM("").window : window;
const DOMPurify = createDOMPurify(appWindow);

export function sanitizeHtmlInput(input: string | Node) {
  return DOMPurify.sanitize(input);
}
