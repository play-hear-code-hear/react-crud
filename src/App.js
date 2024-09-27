import logo from './logo.svg';
import Users from './Users'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Products from "./Products";

function App() {
    return (
       <BrowserRouter>
           <Routes>
               <Route path={"/users"} element={<Users/>}/>
               <Route path={"/products"} element={<Products/>}/>
               <Route path={"/"} element={<Home/>}/>
           </Routes>
       </BrowserRouter>
    )
}

export default App;