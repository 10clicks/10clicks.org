import { HandlerContext } from "$fresh/server.ts";
import { GoogleClient, GitHubClient } from "denoauth";

export const GoogleObject = new GoogleClient({
  clientId: Deno.env.get("GOOGLE_CLIENT_ID")!,
  clientSecret: Deno.env.get("GOOGLE_SECRET")!,
  redirect: `${Deno.env.get("BASE_DOMAIN_NAME")}/api/profile/auth/google`,
  tokenUri: "https://oauth2.googleapis.com/token",
  scope: "https://www.googleapis.com/auth/userinfo.email",
});

export const GitHubObject = new GitHubClient({
  clientId: Deno.env.get("GITHUB_CLIENT_ID")!,
  clientSecret: Deno.env.get("GITHUB_SECRET")!,
  redirect: `${Deno.env.get("BASE_DOMAIN_NAME")}/api/profile/auth/github`,
  tokenUri: "https://github.com/login/oauth/authorize",
  scope: "user:email",
});

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  // get query parameters
  const url = new URL(_req.url);
  const type = url.searchParams.get("type");
  if (type === "google") {
    return new Response("", {
      status: 302,
      headers: {
        Location: GoogleObject.code.createLink(),
      },
    });
  } else if (type === "github") {
    return new Response("", {
      status: 302,
      headers: {
        Location: GitHubObject.code.createLink(),
      },
    });
  }
  return new Response("Invalid type", { status: 400 });
};
