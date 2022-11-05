import AppRouter from "./router/AppRouter";
import {BrowserRouter} from "react-router-dom";

function App() {
    const isAuth = true; // временная переменная
  return (
      <BrowserRouter>
          <AppRouter isAuth={isAuth}/>
      </BrowserRouter>
  );
}

export default App;
