import React, { useState } from "react";
import tshirt from "../assets/tshirt.jpg";
import check from "../assets/checkshirt.jpg";
import coat from "../assets/coat.jpg";
import babydress from "../assets/baby.jpg";
import jeans from "../assets/jeans.jpg";

function Card() {
  const [list, setList] = useState([
    {
      label: "T-Shirt",
      id: 1,
      price: 499,
      quantity: 0,
      image: tshirt
    },
    {
      label: "check Shirt",
      id: 2,
      price: 399,
      quantity: 0,
      image:check
    },
    {
      label: "baby girl",
      id: 3,
      price: 249,
      quantity: 0,
      image:babydress
    },
    {
      label: "Coat",
      id: 4,
      price: 999,
      quantity: 0,
      image:coat
    },
    {
      label: "jeans",
      id: 5,
      price: 799,
      quantity: 0,
      image:jeans
    },
  ]);
  function handleAdd(index,key){
    list[index][key] +=1
    setList([...list])
  }
  function handleRemove(index,key){
    list[index] [key] -=1
    setList([...list])
  }

  return (
    <div className="flex justify-center flex-wrap gap-4 bg-red-100">
      {list.map((aspect, index) => {
        return (
          <div
            key={aspect.id}
            className="card card border-2 shadow-lg w-64"
            
          >
            <img
                src ={aspect.image}
                alt ={aspect.label} className="w-full h-48 object-cover"/>
            <div className="card-body">
              <h5 className="card-text text-center">{aspect.label}</h5>
              
              <p className="card-text fs-6 fw-light">{aspect.price}</p>


                <div className="d-flex gap-2">
                    
                    <button className="btn btn-outline-danger" onClick={()=>handleAdd(index,"quantity")}>Add</button>
                    <button className="btn btn-outline-primary " onClick={()=>handleRemove(index,"quantity")}>remove</button>
                </div>
                <div className="flex">
                    {/* <p className="m-1">
                    <strong>upvote:</strong>{aspect.}
                    </p> */}
                    <p className="m-1">
                    <strong>quantity</strong>{aspect.quantity}
                    </p>
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Card;
