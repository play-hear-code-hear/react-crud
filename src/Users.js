import {useEffect, useState} from "react";
import axios from "axios";
import './App.css';
import {Link} from "react-router-dom";


function Users() {

    const [users, setUsers] = useState(null);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [edit, setEdit] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/users")
            .then((response)=>{
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(error)
            })
    }, []);


    function handleUserName(event) {
        setUserName(event.target.value)
    }

    function handlePassword(event) {
        setPassword(event.target.value)
    }

    function handleEmail(event) {
        setEmail(event.target.value)
    }

    async function getUsers() {
        const response = await axios.get("http://localhost:8080/users");
        setUsers(response.data)
        console.log(response.data)
    }

    async function createUser(event) {
        event.preventDefault();
        const data = {
            username: userName,
            password: password,
            email: email
        }
        const response = await axios.post("http://localhost:8080/users", data);
        alert("saved")
        await getUsers();
        setUserName("");
        setPassword("");
        setEmail("");
    }

    async function updateUser(event) {
        event.preventDefault();
        const data = {
            username: userName,
            password: password,
            email: email
        }
        const updateReq = await axios.put("http://localhost:8080/users/" + edit, data);
        getUsers();
        setEdit(null);
        alert("update user");
        setUserName("");
        setPassword("");
        setEmail("");
    }


    return (
        <div>
            <button type={"button"} onClick={getUsers}>Get All Users</button>
            {
                users && users.map((user) => (
                    <div key={user.id}>
                        {user.username} - {user.email}
                        <button type={"button"} onClick={() => {
                            setEdit(user.id);
                            setUserName(user.username);
                            setPassword(user.password);
                            setEmail(user.email);
                        }}>Edit</button>
                        <button type={"button"} onClick={async () => {
                            const dltUser = await axios.delete("http://localhost:8080/users/" + user.id);
                            await getUsers();
                            alert("delete user")
                        }}>delete
                        </button>
                    </div>
                ))
            }
            {!edit &&
                <div>
                    <h2>create user</h2>
                    <form onSubmit={createUser}>
                        <div>
                            <label>UserName </label>
                            <input type={"text"} onChange={handleUserName} value={userName}/>
                        </div>
                        <div>
                            <label>Password </label>
                            <input type={"password"} onChange={handlePassword} value={password}/>
                        </div>
                        <div>
                            <label>Email </label>
                            <input type={"email"} onChange={handleEmail} value={email}/>
                        </div>
                        <button type={"submit"}>save</button>
                    </form>
                </div>
            }


            {edit &&
                <div>
                    <h2>edit user</h2>
                    <form onSubmit={updateUser}>
                        <div>
                            <label>UserName </label>
                            <input type={"text"} onChange={handleUserName} value={userName}/>
                        </div>
                        <div>
                            <label>Password </label>
                            <input type={"password"} onChange={handlePassword} value={password}/>
                        </div>
                        <div>
                            <label>Email </label>
                            <input type={"email"} onChange={handleEmail} value={email}/>
                        </div>
                        <button type={"submit"}>update user</button>
                        <button type={"button"} onClick={() => {
                            setEdit(null);
                        }}>cancel
                        </button>
                    </form>
                </div>
            }

            <Link to={"/"}>Home</Link><br/>
            <Link to={"/products"}>product</Link>
        </div>
    );

}

export default Users