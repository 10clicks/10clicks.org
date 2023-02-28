export default function Footer() {
    return (
        <><div id="copyright" align="center">&copy; 2022 - 2023 www.10clicks.org</div>
        <script>
        (function(){
            let cpr = document.getElementById("copyright");
            cpr.innerHTML = "&copy; 2022 - "+new Date().getFullYear()+" www.10clicks.org - All Rights Reserved.";
        })();
        </script></>
    )
}