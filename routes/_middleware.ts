import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { createReporter } from "https://deno.land/x/g_a/mod.ts";
import { ConnInfo } from "https://deno.land/std/http/server.ts";

const ga = createReporter({ id: "G-ZJ2X1Z471N" });

interface State {
  data: string;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  let err;
  let res;
  const start = performance.now();
  res = new Response("Join Success");
  ga(req, ctx as ConnInfo, res as Response, start, err);
  return ctx.next();
};