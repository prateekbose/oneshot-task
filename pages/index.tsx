import React, { useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import NavBar from "../components/navbar/NavBar";
import { College } from "../interfaces/interfaces";

const contextInit = {
  theme: "light",
  setTheme: (theme: string) => {},
  data: new Array<College>(),
};

export const AppContext = React.createContext(contextInit);

export async function getServerSideProps() {
  const data = await fetch(process.env.API || "");
  const res = await data.json();

  return {
    props: {
      data: res,
    },
  };
}

interface Props {
  data: Array<College>;
}

const Home = ({ data }: Props) => {
  const [theme, setTheme] = useState("light");

  return (
    <div className={`app ${theme}`}>
      <AppContext.Provider
        value={{ theme: theme, setTheme: setTheme, data: data }}
      >
        <NavBar />
        <Dashboard />
      </AppContext.Provider>
    </div>
  );
};

export default Home;
