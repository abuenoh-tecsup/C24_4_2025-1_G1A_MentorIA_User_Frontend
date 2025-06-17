import Header from "../components/Header";
import SideBar from "../components/SideBar";

function HomePage() {
  return (
    <>
      <Header />
      <div className="container-fluid flex-grow-1 bg-secondary p-0 d-flex">
        <div className="row g-0 flex-grow-1">
            <SideBar className="col-1 d-flex" />
            <main className="col bg-light">
                Main
            </main>
        </div>
      </div>
    </>
  );
}

export default HomePage;
