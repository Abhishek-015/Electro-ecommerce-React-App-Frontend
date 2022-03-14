import React from "react";
import ModalImage from "react-modal-image";
import laptopImage from "../../images/computer/laptop.png";
import { useDispatch } from "react-redux";

const ProductCardInCheckout = ({ prod }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  let dispatch = useDispatch()

  const handleColorChange = (e) => {
    console.log(e.target.value)
    let cart = []
    if(typeof window !== 'undefined'){
      if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      cart.map((product,ind)=>{
        if(product._id===prod._id){
          cart[ind].color = e.target.value
        }
      });
      localStorage.setItem('cart',JSON.stringify(cart))
      dispatch({
        type:"ADD_TO_CART",
        payload:cart
      })
    }
  };

  return (
    <tbody>
      <tr>
        {/* {JSON.stringify(prod)} */}
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {prod.images.length ? (
              <ModalImage
                small={prod.images[0].url}
                large={prod.images[0].url}
              />
            ) : (
              <ModalImage small={laptopImage} large={laptopImage} />
            )}
          </div>
        </td>
        <td>{prod.title}</td>
        <td>₹{prod.price}</td>
        <td>{prod.brand}</td>
        <td>
          <select
            name="color"
            onChange={handleColorChange}
            className="form-control bg-secondary text-white"
            style={{ border: "none", outline: "none" }}
          >
            {prod.color ? (
              <option value={prod.color}>{prod.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((c) => c != prod.color)
              .map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
          </select>
        </td>
        <td>{prod.count}</td>
        <td>Shipping icon</td>
        <td>Delete icon</td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
