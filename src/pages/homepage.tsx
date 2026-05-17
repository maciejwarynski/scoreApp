import kataImg from "../assets/kata.png";
import kumiteImg from "../assets/kumite.png";
import HomePageItem from "../components/homepage_components/homePageItem";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  return (
    <>
      <section className=" h-dvh font-roboto flex flex-col justify-center items-center">
        <header className="w-full flex justify-center  items-center p-10 text-sky-600 font-medium text-5xl">
          <h1>Choose between:</h1>
        </header>
        <section className="w-full h-full text-slate-50 p-10 text-5xl flex justify-between items-center">
          <HomePageItem
            title="KATA"
            image={kataImg}
            onClick={() => navigate("/kata")}
          />
          <p className="px-4 py-2 rounded-full bg-sky-600 border-white border shadow text-xl font-bold">
            OR
          </p>
          <HomePageItem
            title="KUMITE"
            image={kumiteImg}
            onClick={() => navigate("/kumite")}
          />
        </section>
      </section>
    </>
  );
}

export default Homepage;
