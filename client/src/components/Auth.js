import React, { useState } from "react";
import "./auth.css"
import Axios from 'axios'
import { useNavigate } from "react-router-dom";



function Auth() {
    let navigate = useNavigate();
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("") ;

    const [LoginStatus, setLoginStatus] = useState("")

    const register = () => {
        Axios.post('http://localhost:8000/register', {
            username: usernameReg,
            password: passwordReg,
        }).then((response) => {
            console.log(response);
        });
    };


    const login = () => {
        Axios.post('http://localhost:8000/login', {
            username: username,
            password: password,
        }).then((response) => {
            if (response.data.message){
                setLoginStatus(response.data.message);
            } else{
                setLoginStatus(response.data[0].username);
                sessionStorage.setItem('username',response.data[0].username);
                navigate("/Chat");
                
            }
        });
    };

    return (
        <div className="App">
            <div className="registration">
                <h1>Registration</h1>
                <label>Username</label>
                <input type="text" onChange={(e) =>{
                    setUsernameReg(e.target.value);
                }} />
                <label> Password</label>
                <input type="text" onChange={(e) =>{
                    setPasswordReg(e.target.value);
                }}/>
                <button onClick={register} >Register</button>
            </div>




        <div className="login">
            <h1>Login</h1>
            <input type="text" placeholder="Username..."
            onChange={(e) =>{
                setUsername(e.target.value);
            }} />
            <input type="password" placeholder="Password..."
            onChange={(e) =>{
                setPassword(e.target.value);
            }} />
            <button onClick={login}>login</button>
        </div>

        <h1>{LoginStatus}</h1>
        </div>
    );
  }
  
  export default Auth;


