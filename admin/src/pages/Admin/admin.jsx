import './admin.css';
import Sidebar from '../../components/sidebar/sidebar';
import {Routes,Route} from 'react-router-dom';
import AddProduct from '../../components/addproduct/addproduct';
import ListProduct from '../../components/listproduct/listproduct';


const Admin=()=>{
    return(
        <div className="admin">
            <Sidebar></Sidebar>
            <Routes>
                <Route path='/addproduct' element={<AddProduct></AddProduct>}></Route>
                <Route path='/listproduct' element={<ListProduct/>}></Route>
            </Routes>
        </div>
    )
}

export default Admin