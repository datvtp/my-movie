import React from "react";

const Button = ({
  onClick,
  className,
  type = "button",
  bgColor = "primary",
  full = false,
  children,
}) => {
  let bgClassName;

  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;

    case "secondary":
      bgClassName = "bg-secondary";
      break;

    default:
      break;
  }

  return (
    <button
      type={type}
      className={`py-3 px-6 rounded-lg capitalize ${bgClassName} ${
        full ? "w-full" : ""
      } mt-auto ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
