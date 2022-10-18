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
function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/regProName" element={<RegisterProName />}></Route>
              <Route path="/admin/regProSzie" element={<RegisterProSize />}></Route>
              <Route path="/admin/regProDetail" element={<RegisterProMat />}></Route>
          </Routes>
    </Router>
  );
};

export default App;
