import { useContext } from "react";
import { Moon, Sun } from "react-feather";
import { AppContext } from "../../pages";

const NavBar = () => {
  const { theme, setTheme } = useContext(AppContext);
  return (
    <nav>
      <h1>CollegeTrack</h1>
      <div>
        <div
          className="theme"
          onClick={() => setTheme(theme == "light" ? "dark" : "light")}
        >
          {theme == "light" ? <Moon /> : <Sun />}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
