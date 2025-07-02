import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="d-flex flex-column flex-lg-row min-vh-100">
      <Header />
      <main className="flex-grow-1 bg-light p-3">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
