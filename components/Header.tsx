import { JSX } from "preact";

export default function Header() {
  return (
    <div className="w-screen h-14 flex-shrink-0" style={
      {
        background: "#EEEEEE",
        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)"
      }
    }>
      <div style={
        {
          'color': "#333333"
        }
      } className="justify-end flex flex-row items-center gap-4 pr-8 h-full font-normal text-lg">
        <a className="flex flex-row items-center gap-2 mr-auto ml-8 font-bold text-3xl" href="/">
          <img src="/10c_logo.png" alt="logo" class="rounded h-8 w-8"/>
          <h1 className="text-3xl font-semibold">10clicks.org</h1>
        </a>
        <a href="/checklist">Checklist</a>
        <a href="/philosophy">Philosophy</a>
        <a href="/developers">Developers</a>
      </div>
    </div>
  )
}