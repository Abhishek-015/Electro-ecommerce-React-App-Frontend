import React from "react";
import { Card} from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptopImage from "../../images/computer/laptop.png";
import { Link } from "react-router-dom";

const {Meta} = Card

const ProductCard = ({ product }) => {
    const {images,slug,title,description} = product
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
        <Link to={`/admin/product/${slug}`}>
          <EyeOutlined className="text-primary" />
          <br />
          View Product
        </Link>,
        <>
          <ShoppingCartOutlined className="text-danger" />
          <br />
          Add to Cart
        </>,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default ProductCard;
