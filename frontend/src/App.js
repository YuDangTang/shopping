import { 
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import Main from "./pages/Main.js";
import Admin from "./pages/admin/Admin.js";
// import Admin from "./routers/Admin.js";
import RegisterProName from "./pages/admin/RegisterProName.js";
import RegisterProSize from "./pages/admin/RegisterProSize.js";
import RegisterProMat from "./pages/admin/RegisterProMat.js";
import RegisterMaterial from "./pages/admin/material/RegisterMaterial.js";
import RegisterColor from "./pages/admin/material/RegisterColor.js";
import Stocks from "./pages/admin/Stocks.js";
function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/regProName" element={<RegisterProName />}></Route>
              <Route path="/admin/regProSzie" element={<RegisterProSize />}></Route>
              <Route path="/admin/regProDetail" element={<RegisterProMat />}></Route>
              <Route path="/admin/regProMaterial" element={<RegisterMaterial />}></Route>
              <Route path="/admin/regProColor" element={<RegisterColor/>}></Route>
              <Route path="/admin/stocks" element={<Stocks/>}></Route>
          </Routes>
    </Router>
  );
};

export default App;
