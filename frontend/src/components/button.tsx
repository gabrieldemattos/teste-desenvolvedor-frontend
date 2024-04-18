import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: JSX.Element;
}

const Button = ({ text, icon, ...props }: ButtonProps) => {
  return (
    <button {...props}>
      {icon} {text}
    </button>
  );
};

export default Button;
