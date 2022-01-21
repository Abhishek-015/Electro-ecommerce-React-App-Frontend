import React, { useEffect, useState } from "react";
import AdminNav from "../../component/nav/AdminNav";
import { getProductsBYCount } from "../../utils/product";

import {LoadingOutlined} from '@ant-design/icons'

const AdminDashboard = () => {
  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    loadAllProducts()
  },[])
   
  const loadAllProducts = () => {
    setLoading(true)
     getProductsBYCount(100)
     .then(res =>{
       setProducts(res.data)
       setLoading(false)
      })
     .catch(err =>  {
       setLoading(false)
       console.log(err)
      })
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div>
        {loading ? (
            <LoadingOutlined className="text-danger ml-5 h1"  />
          ) : (
            <h4 className="my-3">Products</h4>
          )}
          {JSON.stringify(products)}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
