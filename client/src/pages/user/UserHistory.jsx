import React from "react";
import UserNav from "../../component/nav/UserNav";
import UserPanel from "./UserUtils";

const UserHistory = () => (
  <UserPanel UserNav={UserNav} pageText='User History Page'/>
);

export default UserHistory;
