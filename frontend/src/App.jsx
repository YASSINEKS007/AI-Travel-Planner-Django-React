import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import NotAuthorized from "./pages/NotAuthorized";

const App = () => {
  const isAuthenticated = useSelector((state) => state.accessToken != null);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={<AuthPage />}
        />

        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <NotAuthorized />}
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
