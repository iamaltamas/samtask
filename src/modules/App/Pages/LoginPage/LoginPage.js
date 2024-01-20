import React, { useState, useEffect } from "react";
import Card from "../../../Components/Card/Card";
import TextInput from "../../../Components/InputComponent/InputComponent";
import Button from "../../../Components/ButtonComponent/ButtonComponent";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  // useEffect(() => {
  //   window.localStorage.clear();
  // }, []);

  const inputHandle = (keyName, keyValue) => {
    const update = { ...user };
    update[keyName] = keyValue;
    setUser(update);
  };

  const loginHandle = () => {
    if (!user.username || !user.password) {
      return toast("all filed is require");
    }
    fetch(`https://dummyjson.com/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((result) => {
      result.json().then((response) => {
        if (response?.token) {
          toast.success("Success !", {});
          window.localStorage.setItem("token", response?.token);
          navigate("/home");
        } else {
          toast.error(response?.message, {});
        }
      });
    });
  };

  return (
    <div className="login-body">
      <Card
        bgColor="#ebebe0"
        width={500}
        height={500}
        borderRadius={10}
        padding={30}
      >
        <h4 className="hading">LOGIN</h4>
        <TextInput
          value={user?.username}
          tittle="User Name"
          placeholder="User Name"
          onChange={(message) => inputHandle("username", message)}
        />
        <TextInput
          value={user?.pin}
          tittle="Password"
          placeholder="Password"
          onChange={(message) => inputHandle("password", message)}
        />
        <div className="btn-body">
          <Button size="lg" variant="success" onClick={loginHandle}>
            Login
          </Button>
        </div>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
