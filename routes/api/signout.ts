import { HandlerContext } from "$fresh/server.ts";

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const headers: Headers = new Headers();
  headers.append("Set-Cookie", `refreshToken=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
  headers.append("Location", "/profile");
  headers.append("Set-Cookie", `profilePicture=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
  headers.append("Set-Cookie", `profileName=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`);

  return new Response("Success", {
    status: 307,
    headers: headers,
  });
};
