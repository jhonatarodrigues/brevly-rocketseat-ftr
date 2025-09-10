import { env } from "#src/env.ts";
import { createHash } from "crypto";

function toBase62(num: number) {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let str = "";
  do {
    str = chars[num % 62] + str;
    num = Math.floor(num / 62);
  } while (num > 0);
  return str;
}

export function generateShortUrlFromUrl(url: string, length = 6) {
  const now = Date.now();
  const input = `${url}-${now}`;
  const hash = createHash("sha256").update(input).digest();
  const num = hash.readUIntBE(0, 6);
  const base62 = toBase62(num);
  return `${env.URL_API}/${base62.slice(0, length)}`;
}
