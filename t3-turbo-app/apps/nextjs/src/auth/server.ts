import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { nextCookies } from "better-auth/next-js";
import { phoneNumber } from "better-auth/plugins";
import twilio from "twilio";

import { initAuth } from "@acme/auth";

import { env } from "~/env";

const baseUrl =
  env.NODE_ENV === "production"
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = env.TWILIO_ACCOUNT_SID;
const authToken = env.TWILIO_AUTH_TOKEN;
const fromPhoneNumber = env.TWILIO_FROM_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const auth = initAuth({
  baseUrl,
  productionUrl: `https://${env.VERCEL_PROJECT_PRODUCTION_URL ?? "t3gg.app"}`,
  secret: env.AUTH_SECRET,
  discordClientId: env.AUTH_DISCORD_ID,
  discordClientSecret: env.AUTH_DISCORD_SECRET,
  googleClientId: env.GOOGLE_CLIENT_ID,
  googleClientSecret: env.GOOGLE_CLIENT_SECRET,
  extraPlugins: [
    nextCookies(),
    phoneNumber({
      sendOTP: ({ phoneNumber, code }, ctx) => {
        // Implement sending OTP code via SMS
        if (env.NODE_ENV === "production") {
          client.messages
            .create({
              body: `Your OTP is ${code}`,
              from: fromPhoneNumber,
              to: phoneNumber,
            })
            .then((res) => {
              console.log("\n-----------OTP Triggered-------------", res);
            })
            .catch((err) => {
              console.error(
                "\nFAILED TO SEND OTP" + " " + "sendOTP function",
                err,
              );
            });
          return;
        }

        console.log(`\n=======OTP:${code} - ${phoneNumber} =========\n`);
      },
      signUpOnVerification: {
        getTempEmail: (phoneNumber) => {
          return `${phoneNumber}@my-site.com`;
        },
        //optionally, you can also pass `getTempName` function to generate a temporary name for the user
        getTempName: (phoneNumber) => {
          return phoneNumber; //by default, it will use the phone number as the name
        },
      },
    }),
  ],
});

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);
