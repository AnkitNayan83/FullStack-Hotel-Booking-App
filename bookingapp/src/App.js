import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Hotel } from "./pages/hotel/Hotel";
import { List } from "./pages/list/List";
import "./App.scss";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/Register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Bookings } from "./pages/bookings/Bookings";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Bookings />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={user ? <Hotel /> : <Login />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
