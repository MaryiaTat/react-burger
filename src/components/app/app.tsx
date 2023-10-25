import { FC, useState, useEffect } from "react";
import "./app.css";
import AppHeader from "../app-header/app-header";
import ConstructorPage from "../constructor-page/constructor-page";
import { getIngredients } from "../../utils/burger-api";

const App: FC = () => {
  const [data, setData] = useState();
  useEffect(() => {
    getIngredients()
      .then(({ data }) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <AppHeader />
      {data && <ConstructorPage data={data} />}
    </div>
  );
};

export default App;
