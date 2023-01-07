import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import Header from "../components/Header.tsx";
import Checklist from "../components/Checklist.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="globals.css" />
        <link rel="icon" href="/10c_favicon_48x48.ico" />
        <title>10clicks.org</title>
      </Head>
      <div>
        <Header />
        <Checklist />
      </div>
    </>
  );
}