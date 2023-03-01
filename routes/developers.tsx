import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import Footer from "../components/Footer.tsx";
import DevelopersDescription from "../components/Developers.tsx";
export default function Developers() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="globals.css" />
        <link rel="icon" href="/10c_favicon_48x48.ico" />
        <title>10clicks.org</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header/> 
        <DevelopersDescription/>
        <Footer/>
      </div>
    </>
  )
}