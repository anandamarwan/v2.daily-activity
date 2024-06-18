import { Link, Outlet } from "react-router-dom";

export function RootRoute() {
  return (
    <div className="flex justify-center m-10 ">
      <div className="flex flex-col gap-4 w-full max-w-3xl">
        <header className=" flex justify-between">
          <h1 className="text-3xl">
            <Link to="/">Today</Link>
          </h1>

          <nav>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </header>

        <hr />
        <main className=" space-y-4">
          <div>
            <div className="flex flex-col">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
