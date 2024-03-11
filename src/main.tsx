// main.tsx

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/pages/login/login";
import Home from './components/pages/home/home';
import NavBar from './components/layout/Navbar/navbar';
import Footer from "./components/layout/Footer/footer";
import CreateAccountPage from "./components/pages/createAccount/createAccount";
import ReactDOM from "react-dom/client";
import React from "react";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <React.StrictMode>
      <div className="relative z-30">
        <QueryClientProvider client={queryClient}>
          <Router>
            <div className="relative z-30">
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login/" element={<LoginPage />} />
                <Route path="/create-account/" element={<CreateAccountPage />} />
              </Routes>
              <Footer />
            </div>
          </Router>
        </QueryClientProvider>
      </div>
    </React.StrictMode>
  </>);
