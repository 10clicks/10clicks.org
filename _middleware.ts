import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { createReporter } from "https://deno.land/x/g_a/mod.ts";
import { ConnInfo, serve } from "https://deno.land/std/http/server.ts";

const ga = createReporter({ id: "G-ZJ2X1Z471N" });

serve((req: Request, connInfo: ConnInfo) => {
  console.log("I am here")
  let err;
  let res;
  const start = performance.now();
  try {
    res = new Response("Join Success");
  } catch (e) {
    err = e;
  } finally {
    ga(req, connInfo, res as Response, start, err);
  }
  return res as Response;
});