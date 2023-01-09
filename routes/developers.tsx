import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import DevelopersDescription from "../components/Developers.tsx";
export default function Developers() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="globals.css" />
        <link rel="icon" href="/10c_favicon_48x48.ico" />
        <title>10clicks.org</title>
      </Head>
      <div>
        <Header/> 
        <DevelopersDescription/>
      </div>
    </>
  )
}