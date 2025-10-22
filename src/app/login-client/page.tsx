'use client'

import { handleSubmit } from '@/lib/actions'

export default function LoginPage() {

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1>login-client page</h1>
      <form action={handleSubmit}>
        <div className="flex flex-col py-4">
          <label htmlFor="name">Name</label>
          <input className="w-[200px] border border-white rounded px-2" id="name" name="name" />
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="password">Password</label>
          <input className="w-[200px] border border-white rounded px-2" id="password" name="password" type="password" />
        </div>
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-800 cursor-pointer">Login</button>
      </form>
    </div>
  );
}