import React from "react";

const Loader = () => {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

const Spinner = () => {
  return (
    <>
      <div className="spinner">
        <div className="spinner-loader"></div>
      </div>
    </>
  );
};

export default Spinner;
export {Loader};
