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
    body.set("client_id", Deno.env.get("GITHUB_CLIENT_ID")!);
    body.set("client_secret", Deno.env.get("GITHUB_SECRET")!);
    body.set("redirect_uri", `${Deno.env.get("BASE_DOMAIN")}/api/profile/auth/github`);
    body.set("grant_type", "authorization_code");
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers,
      body,
    });
    const data = await response.text()
    console.log(data);

    if (data) {
      const access_token = data.split("&")[0].split("=")[1];
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
      const userData = await response.json();
      console.log(JSON.stringify(userData));
      return new Response("Success", { status: 200 });
    }
    return new Response("Invalid token", { status: 400 });
  }
  return new Response("Invalid code", { status: 400 });
};
