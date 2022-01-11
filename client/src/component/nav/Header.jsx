import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined,UserAddOutlined,UserOutlined } from '@ant-design/icons';
import { Content } from "antd/lib/layout/layout";

const { SubMenu } = Menu;


const Header = () =>{

    const [current,setCurrent] = useState('home')

    const handleClick = (e) =>{
        console.log(e.key)
        setCurrent(e.key)
    }

    return(
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<AppstoreOutlined />}>
         <Link to='/'>Home</Link>
        </Menu.Item>
        <Menu.Item key="register" icon={<UserAddOutlined /> } className="float-right">
        <Link to='/register'>Register</Link>
        </Menu.Item>
        <Menu.Item key="login" icon={<UserOutlined />} className="float-right">
        <Link to='/login'>Login</Link>
        </Menu.Item>
        <SubMenu key="username" icon={<SettingOutlined />} title="Username">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
        </SubMenu>

      </Menu>
    )
}

export default Header