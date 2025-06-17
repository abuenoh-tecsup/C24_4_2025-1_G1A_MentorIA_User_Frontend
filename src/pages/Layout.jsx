import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <div className="container-fluid flex-grow-1 bg-secondary p-0 d-flex">
        <div className="row g-0 flex-grow-1">
          <SideBar className="col-1 d-flex" />
          <main className="col bg-light p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
