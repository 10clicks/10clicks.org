export default function Signup() {
  function loginWithGoogle() {
    // redirect to login
    window.location.href = "/api/login?type=google";
  }
  function loginWithGithub() {
    // redirect to login
    window.location.href = "/api/login?type=github";
  }

  return (
    <div className="w-screen flex flex-col items-center justify-center gap-4">
      <button className="w-52 h-14 border rounded border-black flex flex-row items-center justify-center gap-2" onClick={loginWithGoogle}>
        <img src="/google_icon.png" alt="google logo" className="w-4 h-4 inline-block"/>
        Continue with Google
      </button>
      <button className="w-52 h-14 border rounded border-black flex flex-row items-center justify-center gap-2" onClick={loginWithGithub}>
        <img src="/github_icon.png" alt="github logo" className="w-4 h-4 inline-block"/>
        Continue with Github
      </button>
    </div>
  )
}