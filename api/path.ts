import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const paths = [
    {
      name: "AIer",
      path: "https://c.aging.run",
    },
    {
      name: "OiChat",
      path: "https://chat.oihub.cc",
    },
    {
      name: "Shop",
      path: "https://shop.taoist.fun",
    },
    {
      name: "导航",
      path: "https://gcloudlab.github.io/nav/",
    }
  ];

  return res.send({ code: 200, data: paths, msg: "请求成功" });
}
