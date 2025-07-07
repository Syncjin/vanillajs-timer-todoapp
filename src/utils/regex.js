export function isValidContent(content) {
  return typeof content === "string" && content.trim() !== "";
}

export function isValidTime(time) {
  return /^[0-9]+$/.test(time);
}
