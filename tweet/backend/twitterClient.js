/* eslint-disable no-undef */
const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4040;
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

app.use(express.json());

app.use(cors());

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});

app.get(`/`, async (req, res) => {
  try {
    const { url, oauth_token, oauth_token_secret } = await main();
    res.status(200).json({ url, oauth_token, oauth_token_secret });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.post("/pin", async (req, res) => {
  const { pin, oauth_token, oauth_token_secret } = req.body;
  try {
    const { loggedClient, accessToken, accessSecret } =
      await makeTwitterAuthCall(pin, oauth_token, oauth_token_secret);
    res.status(200).json({
      loggedClient,
      accessToken,
      accessSecret,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

async function makeTwitterAuthCall(PIN, OAUTH_TOKEN, OAUTH_TOKEN_SECRET) {
  const newClient = new TwitterApi({
    appKey: CONSUMER_KEY,
    appSecret: CONSUMER_SECRET,
    accessToken: OAUTH_TOKEN, // oauth token from previous step (link generation)
    accessSecret: OAUTH_TOKEN_SECRET, // oauth token secret from previous step (link generation)
  });

  // Give the PIN to client.login()
  try {
    const {
      client: loggedClient,
      accessToken,
      accessSecret,
    } = await newClient.login(PIN);

    console.log(loggedClient.v1);
    return {
      loggedClient,
      accessToken,
      accessSecret,
    };
  } catch (error) {
    console.log(error);
  }
  // loggedClient is an authenticated client in behalf of some user
  // Store accessToken & accessSecret somewhere
}

async function main() {
  // OAuth 1.0a (User context)
  const client = new TwitterApi({
    appKey: CONSUMER_KEY,
    appSecret: CONSUMER_SECRET,
    accessToken: ACCESS_TOKEN,
    accessSecret: ACCESS_TOKEN_SECRET,
  });

  const rwClient = client.readWrite;

  try {
    // generate auth link for client to authorize
    const { url, oauth_token, oauth_token_secret } =
      await rwClient.generateAuthLink();
    return { url, oauth_token, oauth_token_secret };
  } catch (error) {
    console.log(error);
  }
}

main();

// https://github.com/PLhery/node-twitter-api-v2/blob/38f87ecc8d58cf8da92798be408fecd632e54219/doc/auth.md

// https://github.com/plhery/node-twitter-api-v2/blob/HEAD/doc/basics.md

// sample url: http://127.0.0.1:5173/?oauth_token=vCEVbAAAAAABrTOkAAABjDiVpoo&oauth_verifier=LgS6Y1RVGUIr3Sv0C47wCYX908uJArEQ

/*
TwitterApiv1 {
  _currentUser: null,
  _currentUserV2: null,
  _requestMaker: ClientRequestMaker {
    rateLimits: {},
    clientSettings: {},
    consumerToken: 'nQ6Gw720fTivslHC6TAw8x909',
    consumerSecret: 'vlhKcBkqGnTGTvqaLJvpVf701glcyP6KBgVu7IlbHIsGh3yTET',
    accessToken: '1559916726837358593-Zbj12H5FMnHL2XaEqaefRSvhBWd6Xv',
    accessSecret: 'PCNowT6yvOFk1gXylC13q5lmF0PESaYaTHp7VgsBijWPj',
    _oauth: OAuth1Helper { nonceLength: 32, consumerKeys: [Object] }
  },
  _prefix: 'https://api.twitter.com/1.1/'
}
*/
