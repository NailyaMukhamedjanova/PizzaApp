import styles from "./Input.module.css";
import cn from "classnames";
import { InputProps } from "./Input.props";

const Input = ({ className, isValid = false, ...props }: InputProps) => {
  return (
    <input
      className={cn(styles.input, className, {
        [styles.invalid]: isValid,
      })}
      {...props}
    />
  );
};

export default Input;

// npm install classnames
