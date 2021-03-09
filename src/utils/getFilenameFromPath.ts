export function getFilenameFromPath(path: string) {
  const re = new RegExp("([^/]+$)");
  return re.exec(path)![0];
}