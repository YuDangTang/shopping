import { 
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import React, { useEffect,useState } from 'react';

import styled from 'styled-components';
import Admin from "./pages/admin/Admin.js";
import Main from './pages/Main';
import QnA from './pages/board/QnA';
import Category from './pages/category/Category';
import Login from './pages/member/Login';
import Modify from './pages/member/Modify';
import MyShop from './pages/myshop/MyShop';
import Order from './pages/myshop/Order';
import Basket from './pages/order/Basket';
import OrderForm from './pages/order/OrderForm';
import RegisterProName from "./pages/admin/RegisterProName.js";
import RegisterProSize from "./pages/admin/RegisterProSize.js";
import RegisterProMat from "./pages/admin/RegisterProMat.js";
function App() {
  // 로그인 상태 관리
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if(sessionStorage.getItem('user_id') === null){
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
      console.log('isLogin ?? :: ', isLogin)
    } else {
    // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
    // 로그인 상태 변경
      setIsLogin(true)
      console.log('isLogin ?? :: ', isLogin)
    }
  }, []);
  return (
    //<Container>
      <Router>
        {/* <MainNavigation isLogin={isLogin}/> */}
          <Routes >
            <Route path='/' element={<Main />} />
            <Route path='/qna' element={<QnA />} />
            <Route path='/category/:id' element={<Category />} />
            <Route path='/login' element={<Login />} />
            <Route path='/modify' element={<Modify />} />
            <Route path='/myshop' element={<MyShop />} />
            <Route path='/order' element={<Order />} />
            <Route path='/basket' element={<Basket />} />
            <Route path='/orderform' element={<OrderForm />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/regProName" element={<RegisterProName />}></Route>
            <Route path="/admin/regProSzie" element={<RegisterProSize />}></Route>
            <Route path="/admin/regProDetail" element={<RegisterProMat />}></Route>
          </Routes>
      </Router>
    //</Container>  
  );
};

const Container = styled.div`
  width: auto;
  height: auto;
  max-width: 1280px;
  margin:auto;
`

export default App;
