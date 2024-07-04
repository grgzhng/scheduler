import { login, signup } from "./actions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
    </main>
  );
}
