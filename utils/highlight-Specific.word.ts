import clsx from "clsx";

export const highlightSpecificWord = (props: {
  text: string;
  word: string | string[];
  classNames: string;
}) => {
  const { classNames, text, word } = props;
  const joinedClassNames = Array.isArray(classNames)
    ? classNames.join(" ")
    : classNames;
  const ELEMENT = `<span class="${clsx(joinedClassNames)}">${word}</span>`;

  if (typeof window === "undefined") return text;

  if (Array.isArray(word)) {
    return text
      .split(" ")
      .map((item) => {
        const ELEMENT = `<span class="${clsx(joinedClassNames)}">${item}</span>`;

        if (word.includes(item)) {
          return ELEMENT;
        } else {
          return item;
        }
      })
      .join(" ");
  } else {
    return text
      .split(" ")
      .map((item) => (item === word ? ELEMENT : item))
      .join(" ");
  }
};
