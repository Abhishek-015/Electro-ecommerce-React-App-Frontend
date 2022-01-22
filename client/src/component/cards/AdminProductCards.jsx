import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import laptopImage from "../../images/computer/laptop.png";
const { Meta } = Card;

const AdminProductCard = ({ product,removeProduct,handleRemove }) => {
  const { title, description, images,slug } = product;
  return (
    <Card
      hoverable
      cover={
        <img
          alt="example"
          src={images && images.length ? images[0].url : laptopImage}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <EditOutlined className="text-primary" />,
        <DeleteOutlined className="text-danger" onClick={()=>handleRemove(slug)}/>,
      ]}
    >
      <Meta title={title} description={`${description && description.substring(0,40)}...`} />
    </Card>
  );
};

export default AdminProductCard;
