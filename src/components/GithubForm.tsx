
// export function GithubForm() {
//     return (
//         <div>
//           <label htmlFor="github-handle" className="block text-sm font-medium leading-6 text-gray-400">
//             Github Handle
//           </label>
//           <div className="mt-2">
//             <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//               <span className="flex select-none items-center pl-3 text-gray-200 sm:text-sm">https://github.com/</span>
//               <input
//                 type="text"
//                 name="github-handle"
//                 id="github-handle"
//                 className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                 placeholder="m2rads"
//               />
//             </div>
//           </div>
//         </div>
//       )
// }

export function GithubForm() {
    return(
        <div className="mt-10">
            <form className="flex justify-center rounded-lg items-baseline bg-slate-900 shadow-md  pt-6 pb-6 mb-4">
                <div className="flex-1 rounded-md ml-4 mr-2">
                    <input className=" w-full py-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Github Username" />
                </div>
                <div className="flex items-center mr-4 justify-between">
                    <button className="bg-blue-500 py-4 px-4 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline" type="button">
                        Get Unwrapped
                    </button>
                </div>
            </form>
        </div>
    )
}