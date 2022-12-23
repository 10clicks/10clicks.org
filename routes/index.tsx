import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import Header from "../components/Header.tsx";
import Checklist from "../components/Checklist.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="globals.css" />
      </Head>
      <div>
        <Header />
        <Checklist />
      </div>
    </>
  );
}
