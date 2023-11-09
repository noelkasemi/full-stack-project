import { Outlet, Navigate, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
  const { user, token } = useStateContext();
  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (e) => {
    e.preventDefault()
  }

  return (
    <div className="flex h-screen">
      <aside className="bg-purple-700 text-xl w-2/12 flex flex-col p-4 text-white">
        <Link className="py-2 hover:bg-purple-800 px-2" to="/users">
          Users
        </Link>
        <Link className="py-2 hover-bg-purple-800 px-2" to="/dashboard">
          Dashboard
        </Link>
      </aside>
      <section className="flex-1 flex flex-col w-full">
        <header className="w-full font-semibold text-xl h-20 items-center shadow-2xl px-12 flex justify-between">
          <section>Header</section>
          <section className="">
            {user.name}
                <a href="#" className="ml-2" onClick={onLogout}>LogOut</a>
          </section>
        </header>
        <main className="bg-[#eae9ea] text-xl px-12 pt-4 font-serif flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
