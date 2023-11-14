import { useRef } from "react"
import axiosClient from "../axios.client"
import { Link } from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider"

export default function Signup () {

    const nameREF = useRef()
    const emailREF = useRef()
    const passwordREF = useRef()
    const passwordConfirmationREF = useRef()

    const {setUser, setToken} = useStateContext()
    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            name: nameREF.current.value,
            email: emailREF.current.value,
            password: passwordREF.current.value,
            password_confirmation: passwordConfirmationREF.current.value
        }
        axiosClient.post('/signup', payload)   
        .then(({data}) => {
            setUser(data.user)
            setToken(data.token)
        }) 
        
        .catch((err) => {
            console.error("Error during signup:", err);
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data.errors);
            }
        })
        
    }
    
    return (
        <section>
            <section className="flex flex-col  items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-[#eeecee]">
                <header>
                    <a href="/">
                        <h3 className="text-4xl font-bold text-purple-600">
                            Create an account
                        </h3>
                    </a>
                </header>
                <main className="w-full px-6 py-4 mt-6 overflow-hidden bg-slate-50 shadow-md sm:max-w-md sm:rounded-lg">
                    <form autoComplete="on" onSubmit={onSubmit}>
                        <section>
                            <label
                                htmlFor="name" 
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Name
                            </label>
                            <article className="flex flex-col items-start">
                                <input
                                    autoComplete="on"
                                    ref={nameREF}
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </article>
                        </section>
                        <section className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <article className="flex flex-col items-start">
                                <input
                                    autoComplete="on"
                                    id="email"
                                    ref={emailREF}
                                    type="email"
                                    name="email"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </article>
                        </section>
                        <section className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <article className="flex flex-col items-start">
                                <input
                                    id="password"
                                    ref={passwordREF}
                                    type="password"
                                    name="password"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </article>
                        </section>
                        <section className="mt-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Confirm Password
                            </label>
                            <article className="flex flex-col items-start">
                                <input
                                    id="password_confirmation"
                                    ref={passwordConfirmationREF}
                                    type="password"
                                    name="password_confirmation"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </article>
                        </section>
                        <section className="flex items-center justify-end mt-4">
                            <Link to='/login'
                                className="text-sm text-gray-600 underline hover:text-gray-900"
                               
                            >
                                Already registered?
                            </Link>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                            >
                                Register
                            </button>
                        </section>
                    </form>
                </main>
            </section>
        </section>
    )
}