import { HandlerContext } from "$fresh/server.ts";
import * as cookieDriver from "../../database/database.ts";


export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  // get refreshToken from cookie
  const refreshToken = _req.headers.get("Cookie")?.split("refreshToken=")[1].split(";")[0];
  if (refreshToken) {
    const user = await cookieDriver.getUserByToken(refreshToken);
    if (user) {
      return new Response(JSON.stringify(user), { status: 200 });
    }
    return new Response("Invalid token", { status: 400 });
  }
  return new Response("Invalid code", { status: 400 });
};
