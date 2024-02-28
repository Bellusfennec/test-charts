const colorCodes: any = {};
export function stringToColorCode(str: string) {
  return str in colorCodes
    ? colorCodes[str]
    : (colorCodes[str] = "#" + ("000000" + ((Math.random() * 0xffffff) << 0).toString(16)).slice(-6));
}
