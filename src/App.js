import logo from './logo.svg';
import Users from './Users'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import Orders from "./Orders";
import EditOrders from "./EditOrders";

function App() {
    return (
       <BrowserRouter>
           <Routes>
               <Route path={"/users"} element={<Users/>}/>
               <Route path={"/products"} element={<Products/>}/>
               <Route path={"/orders/:id/editOrder"} element={<EditOrders/>}/>
               <Route path={"/orders"} element={<Orders/>}/>
               <Route path={"/"} element={<Home/>}/>
           </Routes>
       </BrowserRouter>
    )
}

export default App;
