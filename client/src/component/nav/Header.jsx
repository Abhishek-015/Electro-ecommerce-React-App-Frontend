import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined
} from "@ant-design/icons";

import { auth } from "../../firebase/firbase";
import { useDispatch } from "react-redux";

const { SubMenu } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");
    const dispatch = useDispatch()
    const history = useHistory()

  const handleClick = (e) => {
    console.log(e.key);
    setCurrent(e.key);
  };

  const logOut =()=>{
    auth.signOut()
    dispatch({
     type:'LOGOUT',
     payload:null
    })
    history.push('/login')
  }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item
        key="register"
        icon={<UserAddOutlined />}
        className="float-right"
      >
        <Link to="/register">Register</Link>
      </Menu.Item>
      <Menu.Item key="login" icon={<UserOutlined />} className="float-right">
        <Link to="/login">Login</Link>
      </Menu.Item>
      <SubMenu key="username" icon={<SettingOutlined />} title="Username">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
        <Menu.Item onClick={logOut} icon={<LogoutOutlined/>}>LogOut</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
