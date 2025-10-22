import Button from "./Button";

export default function LoginPage() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1>login-status page</h1>
      <form>
        <div className="flex flex-col py-4">
          <label htmlFor="name">Name</label>
          <input
            className="w-[200px] border border-white rounded px-2"
            id="name"
            name="name"
          />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="password">Password</label>
          <input
            className="w-[200px] border border-white rounded px-2"
            id="password"
            name="password"
            type="password"
          />
        </div>
        <Button />
      </form>
    </div>
  );
}
