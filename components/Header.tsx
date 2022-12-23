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
      } className="justify-end flex flex-row items-center gap-4 pr-8 h-full font-extralight text-lg">
        <h2 className="mr-auto ml-8 font-bold text-3xl">
          10clicks.org
        </h2>
        <a>Philosophy</a>
        <a>Developers</a>
      </div>
    </div>
  )
}