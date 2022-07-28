import Navbar from "./components/navbar";
import Home from "./components/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import AdminPanel from "./components/adminPanel";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
