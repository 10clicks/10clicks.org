import { HandlerContext } from "$fresh/server.ts";
import * as cookieDriver from "../../database/database.ts";


export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  // get refreshToken from cookie
  const refreshToken = _req.headers.get("Cookie")?.split("refreshToken=")[1].split(";")[0];
  // get which button was clicked from body
  const body = await _req.json();
  const type = body.type;
  if (refreshToken && type) {
    const result = await cookieDriver.processClick(refreshToken, type);
    if (result) {
      return new Response(JSON.stringify(result), { status: 200 });
    }
    return new Response("Invalid token", { status: 400 });
  }
  return new Response("Invalid code", { status: 400 });
};
