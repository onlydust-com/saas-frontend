import axios, { type InternalAxiosRequestConfig } from "axios";

import {
  SUMSUB_APP_TOKEN,
  SUMSUB_BASE_URL,
  SUMSUB_DEFAULT_LEVEL,
  SUMSUB_KYB_LEVEL,
  SUMSUB_KYC_LEVEL,
  SUMSUB_SECRET_KEY,
} from "./constants";
import { SumsubConfig, SumsubLevelName } from "./types";

const { createHmac } = await import("node:crypto");

const config: SumsubConfig = { baseURL: SUMSUB_BASE_URL };

const validLevelNames = [SUMSUB_KYC_LEVEL, SUMSUB_KYB_LEVEL];

axios.interceptors.request.use(createSignature, function (error) {
  return Promise.reject(error);
});

// https://developers.sumsub.com/api-reference/#app-tokens
function createSignature(config: InternalAxiosRequestConfig<SumsubConfig>) {
  const ts = String(Math.floor(Date.now() / 1000));
  const method = config.method?.toUpperCase() ?? "";

  const signature = createHmac("sha256", SUMSUB_SECRET_KEY);
  signature.update(ts + method + config.url);

  if (config.headers) {
    config.headers["X-App-Access-Ts"] = ts;
    config.headers["X-App-Access-Sig"] = signature.digest("hex");
  }

  return config;
}

// https://developers.sumsub.com/api-reference/#access-tokens-for-sdks
function createAccessToken(externalId: string, levelName: SumsubLevelName, ttlInSecs = 600) {
  config.method = "post";

  config.url = `/resources/accessTokens?userId=${encodeURIComponent(
    externalId
  )}&ttlInSecs=${ttlInSecs}&levelName=${encodeURIComponent(levelName)}`;

  config.headers = {
    Accept: "application/json",
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  return config;
}

export async function POST(request: Request) {
  try {
    const { externalId, levelName = SUMSUB_DEFAULT_LEVEL } = await request.json();

    if (!externalId) {
      return new Response("externalId is required.", {
        status: 400,
      });
    }

    if (!validLevelNames.includes(levelName)) {
      return new Response("Invalid levelName.", {
        status: 400,
      });
    }

    const response = await axios<{ token: string; userId: string }>(createAccessToken(externalId, levelName, 1200))
      .then(function (response) {
        if (response.status !== 200) {
          throw new Error("Failed to fetch access token.");
        }

        return response;
      })
      .catch(function (error) {
        console.error("Error:\n", error.response.data);
        throw error;
      });

    const json = JSON.stringify(response?.data);

    if (!json) {
      return new Response("Failed to parse access token.", {
        status: 500,
      });
    }

    return new Response(json);
  } catch (error) {
    console.error(error);

    return new Response("Failed to create access token.", {
      status: 500,
    });
  }
}
