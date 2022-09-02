import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loading = () => {
  return (
    <div>
      <RotatingLines
        strokeColor="#6C62E2"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default Loading;
