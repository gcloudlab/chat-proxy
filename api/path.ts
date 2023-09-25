import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const paths = [
    {
      name: "AIer",
      path: "https://c.aging.run",
    },
    {
      name: "OiChat",
      path: "https://oi.aging.run",
    },
    {
      name: "Shop",
      path: "https://shop.taoist.fun",
    }
  ];

  return res.send({ code: 200, data: paths, msg: "请求成功" });
}
