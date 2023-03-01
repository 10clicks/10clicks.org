import { Head } from "$fresh/runtime.ts";
import Header from "../islands/Header.tsx";
import Checklist from "../islands/Checklist.tsx";
import Footer from "../components/Footer.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="globals.css" />
        <link rel="icon" href="/10c_favicon_48x48.ico" />
        <title>10clicks.org</title>
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Checklist />
        <Footer />
      </div>
    </>
  );
}
