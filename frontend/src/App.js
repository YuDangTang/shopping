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

//conmponent
import TopBox from './components/TopBox';
import GlobalStyles from './css/GlobalStyles';

//page
import Login from"./pages/member/Login";
import Join from "./pages/member/Join";
import Basket from "./pages/order/Basket";
import Order from "./pages/myshop/Order";
import MyShop from "./pages/myshop/MyShop";

function App() {
  return (
    <>
        <GlobalStyles/>
      <Router>
      <TopBox/>
          <Routes>
              {/* 페이지 ui */}
              <Route path="/" element={<Main />} />
              <Route path="/member/login" element={<Login />} />
              <Route path="/member/Join" element={<Join />} />
              <Route path="/order/Basket" element={<Basket />} />
              <Route path="/myshop/Order" element={<Order />} />
              <Route path="/myshop/MyShop" element={<MyShop />} />


              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/regProName" element={<RegisterProName />}></Route>
              <Route path="/admin/regProSzie" element={<RegisterProSize />}></Route>
              <Route path="/admin/regProDetail" element={<RegisterProMat />}></Route>
          </Routes>
    </Router>

    </>
  );
};

export default App;
