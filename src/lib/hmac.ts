import * as crypto from "crypto"

export const create = (key: string, text: string) => {
  const hmac = crypto.createHmac("sha1", key)
  hmac.setEncoding("hex")
  hmac.write(new Buffer(text, "utf-8"))
  hmac.end()
  return `sha1=${hmac.read()}`
}

export const validate = (key: string, text: string, digest: string) => {
  const hash = create(key, text)
  // TODO: Constant time check
  return hash === digest
}
