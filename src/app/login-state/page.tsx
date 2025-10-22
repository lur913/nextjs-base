'use client'

import { handleLogin } from '@/lib/actions'
import { useActionState } from 'react';

export default function LoginPage() {

  const [state, action, pending] = useActionState(handleLogin, undefined)

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1>login-state page</h1>
      <form action={action}>
        <div className="flex flex-col py-4">
          <label htmlFor="name">Name</label>
          <input className="w-[200px] border border-white rounded px-2" id="name" name="name" />
          {state?.errors?.name && <div className="text-red-500 text-xs">{state.errors.name[0]}</div>}
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="password">Password</label>
          <input className="w-[200px] border border-white rounded px-2" id="password" name="password" type="password" />
          {state?.errors?.password && <div className="text-red-500 text-xs">{state.errors.password[0]}</div>}
        </div>
        {state?.message && <div className="text-green-500 text-xs">{state.message}</div>}
        <button type="submit" disabled={pending} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-800 disabled:bg-gray-700 cursor-pointer">{pending? 'Loading...' : 'Login'}</button>
      </form>
    </div>
  );
}