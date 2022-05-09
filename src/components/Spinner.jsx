import { MDBSpinner } from "mdb-react-ui-kit";
import React from "react";

const Spinner = () => {
  return (
  <div className="spinner">
        <MDBSpinner
      className="me-2"
      style={{ width: "3rem", height: "3rem", marginTop: "100px" }}
    >
      <span className="visually-hidden">Loading...</span>
    </MDBSpinner>
  </div>
  );
};

export default Spinner;
