import { HandlerContext } from "$fresh/server.ts";

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const url = new URL(_req.url);
  const code = url.searchParams.get("code");
  if (code) {
    // send token to google api
    const headers = new Headers();
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    const body = new URLSearchParams();
    body.set("code", code);
    body.set("client_id", Deno.env.get("GOOGLE_CLIENT_ID")!);
    body.set("client_secret", Deno.env.get("GOOGLE_SECRET")!);
    body.set("redirect_uri", `${Deno.env.get("BASE_DOMAIN_NAME")}/api/profile/auth/google`);
    body.set("grant_type", "authorization_code");
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers,
      body,
    });
    const data = await response.json();
    if (data.access_token) {
      const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });
      const userData = await response.json();
      console.log(JSON.stringify(userData));
      return new Response("Success", { status: 200 });
    }
    return new Response("Invalid token", { status: 400 });
  } else {
    return new Response("Invalid code", { status: 400 });
  }
};
