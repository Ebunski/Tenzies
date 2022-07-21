import React from "react";
import image from "../images/react_light.png";

export default function Dice(props) {
  const style = {
    backgroundColor: props.isHeld ? "lightgreen" : "white",
  };
  return (
    <div
      style={style}
      className="h-12 w-12 shadow-md rounded-md flex items-center justify-center border cursor-pointer"
      onClick={props.toggleHold}
    >
      <h2 className="text-lg font-bold">{props.value}</h2>
    </div>
  );
}
