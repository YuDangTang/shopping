import { Outlet } from 'react-router-dom';
function Admin(){
    return(
        <div>
            나는 어드민 메인
            <Outlet />
        </div>
    );
}
export default Admin;