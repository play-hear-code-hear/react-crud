import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import axios from "axios";


// function App() {
//
//     const [users, setUsers] = useState(null);
//     const [userName, setUserName] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
//
//     async function getUsers() {
//         const response = await axios.get("http://localhost:8080/users");
//         setUsers(response.data)
//     }
//
//     function handleUserName(event) {
//         setUserName(event.target.value);
//     }
//
//     function handlePassword(event) {
//         setPassword(event.target.value);
//     }
//
//     function handleEmail(event) {
//         setEmail(event.target.value);
//     }
//
//     async function createUser(event) {
//         event.preventDefault();
//         const data = {
//             username: userName,
//             password: password,
//             email: email
//         }
//         const axiosResponse = await axios.post("http://localhost:8080/users", data);
//         console.log(axiosResponse);
//         await getUsers();
//     }
//
//     return (
//         <div className="App">
//             <button type="button" onClick={getUsers}>Get Users</button>
//
//             {users && users.map((row) => (
//                 <div key={row.id}>
//                     {row.username} - {row.email}
//                 </div>
//             ))
//             }
//             <h2>create user</h2>
//             <form onSubmit={createUser}>
//                 <div>
//                     <label>Username</label>
//                     <input type="text" onChange={handleUserName} required/>
//                 </div>
//                 <div>
//                     <label>password</label>
//                     <input type="password" onChange={handlePassword} required/>
//                 </div>
//                 <div>
//                     <label>Email</label>
//                     <input type="email" onChange={handleEmail} required/>
//                 </div>
//                 <button type="submit">Create User</button>
//             </form>
//         </div>
//     );
// }


function App() {

    const [users, setUsers] = useState(null);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [edit, setEdit] = useState(null);

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
        alert("update user")
    }


    return (

        <div className="App">
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
                        }}>Edit
                        </button>
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
                <div><h2>create user</h2>
                    <form onSubmit={createUser}>
                        <div>
                            <label>UserName </label>
                            <input type={"text"} onChange={handleUserName}/>
                        </div>
                        <div>
                            <label>Password </label>
                            <input type={"password"} onChange={handlePassword}/>
                        </div>
                        <div>
                            <label>Email </label>
                            <input type={"email"} onChange={handleEmail}/>
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
                        <button type={"submit"} onClick={updateUser}>update user</button>
                        <button type={"button"} onClick={() => {
                            setEdit(null);
                        }}>cancel
                        </button>
                    </form>
                </div>
            }

        </div>
    );

}

export default App;