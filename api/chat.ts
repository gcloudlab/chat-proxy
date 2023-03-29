import { generatePayload, parseOpenAIStream } from "../utils/openAI";
import type { VercelRequest, VercelResponse } from "@vercel/node";
// #vercel-disable-blocks
// import { fetch, ProxyAgent } from "undici";
// #vercel-end

const apiKey = process.env.OPENAI_API_KEY || "";
const httpsProxy = process.env.HTTPS_PROXY || "";
const baseUrl = process.env.OPENAI_API_BASE_URL || "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { messages } = req.body;
  console.log(req.body);

  if (!messages) {
    return new Response("No input text");
  }
  const initOptions = generatePayload(apiKey, messages);

  // // #vercel-disable-blocks
  // if (httpsProxy) {
  //   initOptions["dispatcher"] = new ProxyAgent(httpsProxy);
  // }
  // // #vercel-end

  // @ts-ignore
  const response = (await fetch( `${baseUrl}/v1/chat/completions`, initOptions)) as Response;

  return new Response(parseOpenAIStream(response));
}
