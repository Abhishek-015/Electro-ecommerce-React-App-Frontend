import React from "react";
import AdminNav from "../../component/nav/AdminNav";

const AdminDashboard = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>
      <div className="col">
          <h4>Admin Dashboard Page</h4>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
