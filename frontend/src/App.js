import React, { useEffect, useState } from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";

// import Admin from "./routers/Admin.js";
import RegisterProName from "./pages/admin/RegisterProName.js";
import RegisterProSize from "./pages/admin/RegisterProSize.js";
import RegisterProMat from "./pages/admin/RegisterProMat.js";
import RegisterMaterial from "./pages/admin/material/RegisterMaterial.js";
import RegisterColor from "./pages/admin/material/RegisterColor.js";
import Stocks from "./pages/admin/Stocks";

//conmponent importing
import TopBox from './components/TopBox';
import GlobalStyles from './css/GlobalStyles';

import Botbox from "./components/Botbox.js";

//page importing
import Main from "./pages/Main.js";
import Admin from "./pages/admin/Admin.js";
import Login from"./pages/member/Login";
import Join from "./pages/member/Join";
import Basket from "./pages/order/Basket";
import Order from "./pages/myshop/Order";
import MyShop from "./pages/myshop/MyShop";
import Product from "./pages/product/product.js";

function App() {
  // 로그인 상태 관리
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('id') === null) {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
      console.log('isLogin ?? :: ', isLogin)
    } else {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      setIsLogin(true)
      console.log('isLogin ?? :: ', isLogin)
    }
  })

  return (
    <>
      <Router>
        <GlobalStyles/>
        <TopBox/>
          <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/member/login" element={<Login />} />
              <Route path="/member/Join" element={<Join />} />
              <Route path="/order/Basket" element={<Basket />} />
              <Route path="/myshop/Order" element={<Order />} />
              <Route path="/myshop/MyShop" element={<MyShop />} />
              <Route path="/product/:id" element={<Product />} />

              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/regProName" element={<RegisterProName />}></Route>
              <Route path="/admin/regProSzie" element={<RegisterProSize />}></Route>
              <Route path="/admin/regProDetail" element={<RegisterProMat />}></Route>
              <Route path="/admin/material/regProMaterial" element={<RegisterMaterial />}></Route>
              <Route path="/admin/material/regProColor" element={<RegisterColor/>}></Route>
              <Route path="/admin/stocks" element={<Stocks/>}></Route>
          </Routes>
          <Botbox/>
    </Router>
    </>
  );
};

export default App;

//리셋 스타일드를 만들어서 페이지에만적용