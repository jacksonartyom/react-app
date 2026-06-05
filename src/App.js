import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import ProtectedRoute from "./components/protectedRoute";
import MainLayout from "./components/mainLayout";
import Items from "./pages/items";
import Sale from "./pages/sale";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/" element={<Login />} />

        {/* protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/items" element={<Items />} />
            <Route path="/sale" element={<Sale />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
