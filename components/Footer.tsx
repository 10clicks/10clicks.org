export default function Footer() {
  /*
  <script>
        (function(){
            let cpr = document.getElementById("copyright");
            cpr.innerHTML = "&copy; 2022 - "+new Date().getFullYear()+" www.10clicks.org - All Rights Reserved.";
        })();
        </script>
  */
  return (
    <div id="copyright" className="bg-white w-screen h-10 flex-shrink-0 border-t border-black bottom-0 flex flex-row items-center justify-center text-gray-700 text-sm lg:text-base">
      &copy; 2022 - 2023 www.10clicks.org - All Rights Reserved.
    </div>
  )
}