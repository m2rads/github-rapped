'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function GithubForm() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/github?username=${username}`);
  };

  return (
    <div className='mt-10'>
      <form
        onSubmit={handleSubmit}
        className='mb-4 flex flex-col items-baseline justify-center gap-2 rounded-lg bg-slate-900 px-4 pb-6  pt-6 shadow-md sm:flex-row'
      >
        <div className='w-full flex-1  rounded-md'>
          <input
            className=' focus:shadow-outline w-full appearance-none rounded border px-3 py-4 leading-tight text-gray-700 shadow focus:outline-none'
            id='username'
            type='text'
            placeholder='Github Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='flex w-full items-center justify-end sm:w-auto'>
          <button
            className='focus:shadow-outline rounded bg-blue-500 px-4 py-4 font-bold text-white hover:bg-blue-700 focus:outline-none'
            type='submit'
          >
            Get Unwrapped
          </button>
        </div>
      </form>
    </div>
  );
}
