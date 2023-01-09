import { useState, useRef, useEffect } from 'preact/hooks'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  function toggleBurgerMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    console.log(isMenuOpen);
    // slide menu in
    if (isMenuOpen) {
      if (!ref.current) return;
      ref.current.style.transform = "translateX(0px)";
    } else {
      console.log("here")
      if (!ref.current) return;
      console.log("yes");
      ref.current.style.transform = "translateX(100%)";
    }
  }, [isMenuOpen]);

  return (
    <div className="w-screen h-14 flex-shrink-0" style={
      {
        backgroundImage: "#FFFFFF",
        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.6)"
      }
    }>
      <div style={
        {
          'color': "#333333"
        }
      } className="justify-end flex flex-row items-center gap-4 pr-8 h-full font-normal text-lg">
        <a className="flex flex-row items-center gap-2 mr-auto ml-8 font-bold text-3xl" href="/">
          <img src="/10c_logo.png" alt="logo" class="rounded md:h-8 md:w-8 h-6 w-6"/>
          <h1 className="md:text-3xl text-lg font-semibold">10clicks.org</h1>
        </a>
        <div className="flex-row items-center gap-4 md:flex hidden">
          <a href="/checklist">Checklist</a>
          <a href="/philosophy">Philosophy</a>
          <a href="/developers">Developers</a>
        </div>
        <button className="md:hidden visible flex flex-col items-center justify-center gap-1" onClick={toggleBurgerMenu}>
          <div className="w-10 h-2 rounded" style={
            {
              backgroundColor: "#DDDDDD"
            }
          }/>
          <div className="w-10 h-2 rounded" style={
            {
              backgroundColor: "#DDDDDD"
            }
          }/>
          <div className="w-10 h-2 rounded" style={
            {
              backgroundColor: "#DDDDDD"
            }
          }/>
        </button>
        <div className='w-1/2 h-screen fixed top-0 right-0 z-50 flex flex-col gap-4 items-center text-black ' style={
          {
            backgroundColor: "white",
            transition: "transform 0.2s ease-in",
            boxShadow: "-1px 2px 0px rgba(0, 0, 0, 0.6)",
            transform:"translateX(100%)"
          }
        } ref={ref}>
          <button className='text-4xl self-end border border-black rounded h-10 w-10 leading-none p-0 m-2 font-light' onClick={toggleBurgerMenu}>
            x
          </button>
          <a href="/checklist">Checklist</a>
          <a href="/philosophy">Philosophy</a>
          <a href="/developers">Developers</a>
        </div>
      </div>
    </div>
  )
}