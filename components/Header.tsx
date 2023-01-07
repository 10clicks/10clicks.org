import { JSX } from "preact";

export default function Header() {
  return (
    <div className="w-screen h-16" style={
      {
        background: "#26A65B",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }
    }>
      <div style={
        {
          'color': "#333333"
        }
      } className="justify-end flex flex-row items-center gap-4 pr-8 h-full font-normal text-lg">
        <a className="flex flex-row items-center gap-2 mr-auto ml-8 font-bold text-3xl" href="/">
          <img src="/10c_logo.png" alt="logo" class="rounded h-12 w-12"/>
          <h1 className="text-4xl font-semibold">10clicks.org</h1>
        </a>
        <a href="/checklist">Checklist</a>
        <a href="/philosophy">Philosophy</a>
        <a href="/developers">Developers</a>
      </div>
    </div>
  )
}