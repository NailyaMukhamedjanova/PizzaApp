import styles from './Button.module.css';
import { ButtonProps } from "./Button.props";
// import { FC } from "react";
import cn from "classnames";

export const Button = ({ children, className, appearence = 'small', ...props }: ButtonProps) => {

  return (
    <button className={cn(styles['button'], className, {
      [styles['small']] : appearence === 'small',
      [styles['big']] : appearence === 'big'
      })} {...props}>
      {children}
    </button>
  );
};



// const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
//   const cn = className ? className + " button" : "button";

//   return (
//     <button className={cn} {...props}>
//       {children}
//     </button>
//   );
// };

// export default Button;
