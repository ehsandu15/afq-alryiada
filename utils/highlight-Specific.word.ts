import clsx from "clsx";

export const highlightSpecificWord = (props: {
  text: string;
  word: string | string[];
  classNames: string;
}) => {
  const { classNames, text, word } = props;
  const regex = new RegExp(`\\b${word}\\b`, "gi");

  if (typeof window === "undefined") return text;

  // TODO: Fix this
  // `<span class="${classNames}">${word}</span>`;

  if (Array.isArray(word)) {
    return text
      .split(" ")
      .map((item) => {
        const spanElem = document.createElement("span");
        spanElem.className = clsx(classNames);
        spanElem.textContent = item;
        if (word.includes(item)) {
          return spanElem.outerHTML;
        } else {
          return item;
        }
      })
      .join(" ");
  } else {
    const spanElem = document.createElement("span");
    spanElem.className = clsx(classNames);
    spanElem.textContent = word;
    return text
      .split(" ")
      .map((item) => (item === word ? spanElem.outerHTML : item))
      .join(" ");
  }
};
