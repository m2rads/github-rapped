export function GithubForm() {
    return(
        <div className="mt-10">
            <form className="flex flex-col sm:flex-row gap-2 justify-center px-4 rounded-lg items-baseline bg-slate-900 shadow-md  pt-6 pb-6 mb-4">
                <div className="flex-1 w-full  rounded-md">
                    <input className=" w-full py-4 shadow appearance-none border rounded px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Github Username" />
                </div>
                <div className="flex items-center w-full sm:w-auto justify-end">
                    <button className="bg-blue-500 py-4 px-4 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline" type="button">
                        Get Unwrapped
                    </button>
                </div>
            </form>
        </div>
    )
}
