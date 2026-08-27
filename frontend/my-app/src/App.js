import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <Route path="/" element={<LandingPage />} />
        ) : (
          <Route path="/" element={<HomePage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
