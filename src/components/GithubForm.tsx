'use client'
import { useState } from "react"
import { useRouter } from "next/navigation";

export function GithubForm() {
    const [username, setUsername] = useState('');
    const router = useRouter();


    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event?.preventDefault();

    //     try {
    //         const response = await fetch('api/github-stats', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({username}),
    //         });
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok'); 
    //         }
    //         const data = await response.json();
    //         console.log('Github stats:', data);
    //         // handle the data here
    //     } catch (error) {
    //         console.error('Errorr fetching Github stats:', error)
    //         // handle errors here
    //     }

    // }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push(`/github?username=${username}`);
    };


    return(
        <div className="mt-10">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center px-4 rounded-lg items-baseline bg-slate-900 shadow-md  pt-6 pb-6 mb-4">
                <div className="flex-1 w-full  rounded-md">
                    <input 
                        className=" w-full py-4 shadow appearance-none border rounded px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" 
                        type="text" 
                        placeholder="Github Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                </div>
                <div className="flex items-center w-full sm:w-auto justify-end">
                    <button className="bg-blue-500 py-4 px-4 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline" type="submit">
                        Get Unwrapped
                    </button>
                </div>
            </form>
        </div>
    )
}
