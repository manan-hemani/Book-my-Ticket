import "./App.css";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Events from "../Pages/Events";
import Auth from "../Pages/Auth";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Profile from "../Pages/Profile";

function App() {
  const [activePage, setActivePage] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setTimeout(() => {
        setCurrentUser(JSON.parse(storedUser));
      }, 0);
    }
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home setActivePage={setActivePage} />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "events":
        return <Events />;
      case "auth":
        return (
          <Auth setCurrentUser={setCurrentUser} setActivePage={setActivePage} />
        );
      case "profile":
        return (
          <Profile
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setActivePage={setActivePage}
          />
        );
      default:
        return <Home />;
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <ToastContainer />
        <Navbar setActivePage={setActivePage} currentUser={currentUser} />
        <main className="flex-1">{renderPage()}</main>
        <Footer />
      </div>
    </>
  );
}

export default App;
