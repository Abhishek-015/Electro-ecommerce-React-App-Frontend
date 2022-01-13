import React from "react";
import UserNav from "../../component/nav/UserNav";
import UserPanel from "./UserUtils";

const UserWishList = () => (
    <UserPanel UserNav={UserNav} pageText='User wishlist page'/>
);

export default UserWishList;
