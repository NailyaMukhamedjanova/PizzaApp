import { createContext, Dispatch, ReactNode,  SetStateAction, useContext, useState } from "react";

type  CartItems = {
    [productId: string]: number;
  
  };

const CartContext = createContext<
    {
        cartItems: CartItems,
        setCartItems: Dispatch<SetStateAction<CartItems>>,
    }>({
        cartItems: {},
        setCartItems: () => {},

    }
);

export const UseCart = () => useContext(CartContext);
export const CartProvider: React.FC<{children : ReactNode}> = ({children}) => {
    const [cartItems, setCartItems] = useState({});
    return (
        <CartContext.Provider value = {{cartItems, setCartItems}}>
            {children}
        </CartContext.Provider>
    )

}