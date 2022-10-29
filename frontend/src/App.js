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
import Update from "./pages/admin/update/Update.js";
import UpdateSize from "./pages/admin/update/UpdateSize.js"; 
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
              <Route path="/admin/:id/stocks" element={<Stocks/>}></Route>
              <Route path="/admin/:id/update" element={<Update url={"update"}/>}></Route>
              <Route path="/admin/:id/update2" element={<Update url={"update2"}/>}></Route>
          </Routes>
    </Router>
  );
};

export default App;
