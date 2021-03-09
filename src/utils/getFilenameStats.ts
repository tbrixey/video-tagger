import { fs } from "../appRuntime";

type Stats = {
  atimeMs: number;
  mtimeMs: number;
  ctimeMs: number;
  birthtimeMs: number;
  atime: Date;
  mtime: Date;
  ctime: Date;
  birthtime: Date;
}

export function getFilenameStats(file: string): Stats {  
  return fs.statSync(file)
}