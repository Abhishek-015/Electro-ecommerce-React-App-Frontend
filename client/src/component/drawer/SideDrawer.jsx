import React from "react";
import { Drawer,Button } from "antd";

import laptopImage from "../../images/computer/laptop.png"
import { useSelector,useDispatch } from "react-redux";

const SideDrawer = ({children}) => {
   const dispatch = useDispatch()
   const {drawer,cart} = useSelector(state => ({...state}))

   return <Drawer visible={true}>
       {JSON.stringify(cart)}
   </Drawer>
}

export default SideDrawer