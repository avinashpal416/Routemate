import React, { useState } from "react";
import './Login.css';
import md5 from "md5";

const Login = () => {
  const [password, setPassword] = useState("password");
  const [username, setUsername] = useState("username");
  const [hashedPassword, setHashedPassword] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'password') {
      setPassword(value);
      setHashedPassword(md5(value)); // Hash password on change
    } else if (name === 'username') {
      setUsername(value);
    }

    document.getElementById(name).style.fontFamily = "Montserrat black";
  };

  const setEmptyValue = (event) => {
    const { name } = event.target;
    if (name === "username") {
      setUsername("");
    } else if (name === "password") {
      setPassword("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}`);
    console.log(`Password Hash: ${hashedPassword}`);
  };

  return (
    <div className="Login">
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <div className="text_area">
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
            onFocus={setEmptyValue}
            className="text_input"
          />
        </div>
        <div className="text_area">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            onFocus={setEmptyValue}
            className="text_input"
          />
        </div>
        <input
          type="submit"
          value="LOGIN"
          className="btn"
        />
      </form>
      {/* <a className="linking" href="/signup">Sign Up</a> */}
    </div>
  );
};

export default Login;
