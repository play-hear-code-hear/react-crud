import {Link} from "react-router-dom";

function Home(){
    return(
        <div >
            <h1>Home</h1>
            <p>Welcome to our home page</p>
            
            <Link to={"/users"}>users</Link><br/>
            <Link to={"/products"}>products</Link>
        </div>
    )
} 
export default Home;