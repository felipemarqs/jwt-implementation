import {createHmac} from "crypto";

interface IGenerateSignatureOptions {
  header: string;
  payload: string;
  secret: string;
}

export function generateSignature({
  header,
  payload,
  secret,
}: IGenerateSignatureOptions) {
  const hmac = createHmac("sha256", secret);

  const signature = hmac.update(`${header}.${payload}`).digest("base64url");

  return {signature};
}
