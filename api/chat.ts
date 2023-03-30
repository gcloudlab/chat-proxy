import { generatePayload } from "../utils/openAI";
import type { VercelRequest, VercelResponse } from "@vercel/node";
// #vercel-disable-blocks
// import { fetch, ProxyAgent } from "undici";
// #vercel-end

const apiKey = process.env.OPENAI_API_KEY || "";
const httpsProxy = process.env.HTTPS_PROXY || "";
const baseUrl = process.env.OPENAI_API_BASE_URL || "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { messages, customKey } = req.body;
  // console.log(req.body);

  if (!messages) {
    return res.send({ code: 406, msg: "输入不能为空", data: null })
  }
  const initOptions = generatePayload(customKey ? customKey : apiKey, messages);

  // #vercel-disable-blocks
  // if (httpsProxy) {
  //   initOptions["dispatcher"] = new ProxyAgent(httpsProxy);
  // }
  // #vercel-end

  // @ts-ignore
  const response = (await fetch( `${baseUrl}/v1/chat/completions`, initOptions)) as Response;
  // console.log(await response.json());
  // console.log(parseOpenAIStream(response));
  if (!response.ok) {
    return res.send({ code: 405, msg: response.statusText, data: null })
  }
  // const data = response.body;

  // if (!data) {
  //   throw new Error("No data");
  // }
  // const reader = data.getReader();
  // const decoder = new TextDecoder("utf-8");

  // const { value, done: readerDone } = await reader?.read();
  // let char = decoder.decode(value);
  // let parse = JSON.parse(char) || {};
  // if (parse?.choices[0]?.message?.content) {
  //   console.log(parse?.choices[0]?.message?.content);
  // }

  return res.send({ code: 200, data: await response.json(), msg: "请求成功" })
  // return new Response(parseOpenAIStream(response));
}
