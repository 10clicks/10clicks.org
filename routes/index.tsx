import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import Checklist from "../islands/Checklist.tsx";
import Footer from "../components/Footer.tsx";
import type { Handlers } from "$fresh/server.ts";
import { getCookies } from "cookie";

export default function Home(props: any) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="globals.css" />
        <link rel="icon" href="/10c_favicon_48x48.ico" />
        <title>10clicks.org</title>
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Checklist 
          refreshToken={props.data.refreshToken}
        />
        <Footer />
      </div>
    </>
  );
}

export const handler: Handlers = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    const refreshToken = cookies.refreshToken;
    return ctx.render({
      refreshToken
    });
  }
};
