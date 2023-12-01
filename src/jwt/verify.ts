import {generateSignature} from "./generateSignature";

interface IVerifyOptions {
  token: string;
  secret: string;
}

export function verify({token, secret}: IVerifyOptions) {
  const [headerSent, payloadSent, signatureSent] = token.split(".");

  const {signature} = generateSignature({
    header: headerSent,
    payload: payloadSent,
    secret,
  });

  if (signature !== signatureSent) {
    throw new Error("Invalid JWT token");
  }

  const decodedPayload = JSON.parse(
    Buffer.from(payloadSent, "base64url").toString("utf-8")
  );

  //console.log({headerSent, payloadSent, signatureSent});

  if (decodedPayload.exp < Date.now()) {
    throw new Error("Expired Token!");
  }

  return decodedPayload;
}
