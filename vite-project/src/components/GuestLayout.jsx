import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function GuestLayout () {
    const {token} = useStateContext()
    if (token) {
        return <Navigate to='/' />
    }
    
    return (
        <section>
            <Outlet />
        <p>guest users only</p>
        </section>
    )
}