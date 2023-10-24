import { FC, useState, useEffect } from "react";
import "./app.css";
import AppHeader from "../app-header/app-header";
import ConstructorPage from "../constructor-page/constructor-page";

const dataUrl = "https://norma.nomoreparties.space/api/ingredients";

const App: FC = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataUrl);
        const json = await response.json();
        setData(json.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <AppHeader />
      {data && <ConstructorPage data={data} />}
    </div>
  );
};

export default App;
