import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const paths = [
    {
      name: "QAchat",
      path: "https://d.mydog.buzz",
    },
    {
      name: "Pro",
      path: "https://c.qachat.pro",
    },
    {
      name: "导航",
      path: "https://nav.navnav.top",
    },
  ];

  return res.send({ code: 200, data: paths, msg: "请求成功" });
}
