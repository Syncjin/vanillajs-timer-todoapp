export function commaFormat(val) {
  if (val === 0 || val === "0") return "0";
  if (val === "" || val == null) return "";
  const numParts = val.toString().split(".");
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return numParts.join(".");
}
