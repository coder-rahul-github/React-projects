import { useState } from "react";

function App() {
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-text">Readeability</h5>

          <div>
            <button  className="btn btn-primary">
              upvote
            </button>&nbsp;
            <button  className="btn btn-danger">
              downvote
            </button>
            <p className="m-1"><strong>upvote:0</strong></p>
            <p className="m-1"><strong>downvote:0</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
