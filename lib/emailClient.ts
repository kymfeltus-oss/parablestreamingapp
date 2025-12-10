import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error("RESEND_API_KEY is not set");
}

export const resend = re_2WkuDLGf_2jj1XtY1AXDg1sj9EyDPnEx5;

export const EMAIL_FROM =
  process.env.EMAIL_FROM || "Parable Support <support@parablestreaming.com>";
