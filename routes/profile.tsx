import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import Footer from "../components/Footer.tsx";
import Profile from "../islands/Profile.tsx";
import type { Handlers } from "$fresh/server.ts";
import { getCookies } from "cookie";


export default function Developers(props: any) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="globals.css" />
        <link rel="icon" href="/10c_favicon_48x48.ico" />
        <title>10clicks.org</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header/> 
        <Profile refreshToken={props.data.refreshToken}/>
        <Footer/>
      </div>
    </>
  )
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

    
