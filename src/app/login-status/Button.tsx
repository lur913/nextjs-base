'use client'

import { handleSubmit } from '@/lib/actions'
import { useFormStatus } from 'react-dom';


const Button = () => {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      formAction={handleSubmit}
      disabled={pending}
      className="bg-blue-600 px-4 py-2 rounded disabled:bg-gray-600 cursor-pointer disabled:cursor-not-allowed"
    >
      {pending ? 'login...' : 'Login'}
    </button>
  );
};

export default Button;
