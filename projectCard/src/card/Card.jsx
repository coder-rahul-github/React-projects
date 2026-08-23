import React, { useState } from "react";

function Card() {
  const [list, setList] = useState([
    {
      label: "Readeability",
      id: 1,
      upvote: 0,
      downvote: 0,
    },
    {
      label: "Performance",
      id: 2,
      upvote: 0,
      downvote: 0,
    },
    {
      label: "Security",
      id: 3,
      upvote: 0,
      downvote: 0,
    },
    {
      label: "Documentation",
      id: 4,
      upvote: 0,
      downvote: 0,
    },
    {
      label: "Testing",
      id: 5,
      upvote: 0,
      downvote: 0,
    },
  ]);
  function handleVote(index,key){
    list[index][key] +=1
    setList([...list])
  }

  return (
    <div className="d-flex justify-center flex-wrap">
      {list.map((aspect, index) => {
        return (
          <div
            key={aspect.id}
            className="card card border-2 shadow-lg"
            style={{ width: "16rem" }}
          >
            <div className="card-body">
              <h5 className="card-text">{aspect.label}</h5>

                <div className="d-flex gap-2">
                    
                    <button className="btn btn-outline-primary " onClick={()=>handleVote(index,"upvote")}>upvote</button>
                    <button className="btn btn-outline-danger" onClick={()=>handleVote(index,"downvote")}>downvote</button>
                </div>
                <div className="flex">
                    <p className="m-1">
                    <strong>upvote:</strong>{aspect.upvote}
                    </p>
                    <p className="m-1">
                    <strong>downvote:</strong>{aspect.downvote}
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
