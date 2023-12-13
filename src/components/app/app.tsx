import { FC } from "react";
// Components
import AppHeader from "../app-header/app-header";
import ConstructorPage from "../constructor-page/constructor-page";
// Styles
import "./app.css";

const App: FC = () => (
  <div className="App">
    <AppHeader />
    <ConstructorPage />
  </div>
);

export default App;
