
export function GithubForm() {
    return (
        <div>
          <label htmlFor="github-handle" className="block text-sm font-medium leading-6 text-gray-400">
            Github Handle
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-200 sm:text-sm">https://github.com/</span>
              <input
                type="text"
                name="github-handle"
                id="github-handle"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-200 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="m2rads"
              />
            </div>
          </div>
        </div>
      )
}