import React from "react";

const ErrorText = ({ ifError }) => {
  return (
    <div className="error">
      {ifError.cod === "404" ? (
        <div>
          <p>{ifError.message}</p>
          <p>Please enter a valid city name</p>
        </div>
      ) : (
        <p>Somthing went wrong</p>
      )}
    </div>
  );
};

export default ErrorText;
