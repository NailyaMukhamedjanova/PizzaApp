
import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import style from "./Cart.module.css";
import productsData from "../../JSON/products.json";
import { UseCart } from "../../context/cardContext";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";

const deliveryCost = 169;

function Cart() {
  const { cartItems, setCartItems } = UseCart();
  const [totalPrice, setTotalPrice] = useState(0);

  const [promoCode, setPromoCode] = useState("");

  const [isPromoVisible, setIsPromoVisible] = useState(false);

  const [isPromoAppliedVisible, setIsPromoAppliedVisible] = useState(false);

  const [promoCodeApplied, setPromoCodeApplied] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(
      localStorage.getItem("cartItems") || "{}"
    );
    setCartItems(storedCartItems);
  }, [setCartItems]);

  useEffect(() => {
    // Расчет общей стоимости товаров в корзине
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      for (const productId in cartItems) {
        const product = productsData.find(
          (item) => item.id === parseInt(productId, 10)
        );
        if (product) {
          totalPrice += product.price * cartItems[productId];
        }
      
      if (promoCodeApplied) {
        setTotalPrice(Math.floor(totalPrice * 0.8));
      } else {
        setTotalPrice(totalPrice);
      }
    }
    };

    calculateTotalPrice();
  }, [cartItems]);

  const handlePromoCodeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPromoCode(event.target.value);
  };

  const applyPromoCode = () => {
    if (promoCodeApplied) {
      setIsPromoAppliedVisible(true);
      setTimeout(hidePromoMessages, 5000);
      return;
    }

    if (promoCode !== "USER1DISCOUNT") {
      setIsPromoVisible(true);
      setTimeout(hidePromoMessages, 2000);
    }

    if (promoCode === "USER1DISCOUNT") {
      setTotalPrice(Math.floor(totalPrice * 0.8));
      setIsPromoVisible(false);
      setIsPromoAppliedVisible(false);

      setPromoCodeApplied(true);

      // setIsPromoVisible(true);
      setTimeout(hidePromoMessages, 5000);
    }
  };

  const updateCartItems = (productId: string, amount: number) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems[productId] = Math.max(0, amount);

    if (updatedCartItems[productId] === 0) {
      delete updatedCartItems[productId];
    }

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const hidePromoMessages = () => {
    setIsPromoVisible(false);
    setIsPromoAppliedVisible(false);
  };

  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartItems");
  };

  return (
    <>
      <Headling>Корзина</Headling>

      {Object.keys(cartItems).length === 0 ? (
        <p>Товаров нет в корзине</p>
      ) : (
        <>
          <div className={style["products"]}>
            {Object.keys(cartItems).map((productId) => {
              const product = productsData.find(
                (item) => item.id === parseInt(productId, 10)
              );
              if (!product) return null;

return (
                <div className={style["product"]} key={productId}>
                  <img src={product.image} alt={product.name} />



                  <div className={style["product__desc"]}>
                    <h3>{product.name}</h3>
                    <span className={style["product__price"]}>
                      {product.price} 
                    </span>
                  </div>



                  <div className={style["product__buttons"]}>
                    <button
                      className={style["decrement"]}
                      onClick={() =>
                        updateCartItems(productId, cartItems[productId] - 1)
                      }
                    >
                      -
                    </button>
                    <span className={style["amount"]}>
                      {cartItems[productId]}
                    </span>
                    <button
                      className={style["increment"]}
                      onClick={() =>
                        updateCartItems(productId, cartItems[productId] + 1)
                      }
                    >
                      +
                    </button>
                    <button
                      className={style["delete-btn"]}
                      onClick={() => updateCartItems(productId, 0)}>
                      X
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={style["promo"]}>
            {isPromoVisible && <span>промокода нет</span>}
            {isPromoAppliedVisible && <span>промокод уже использован</span>}
            <label htmlFor="promo">
              <Input
                className={style["promo__input"]}
                id="promo"
                type="text"
                placeholder="промокод"
                value={promoCode}
                onChange={handlePromoCodeChange}
                isValid={false}
              />
              <Button
                className={style["promo__btn"]}
                onClick={applyPromoCode}
                appearence={"big"}
              >
                применить
              </Button>
            </label>
          </div>

          <div className={style["end"]}>
            <div className={style["row"]}>
              <h5>Итог</h5> <span>{totalPrice} ₽</span>
            </div>
            <div className={style["row"]}>
              <h5>Доставка</h5> <span>{deliveryCost} ₽</span>
            </div>
            <div className={style["row"]}>
              <h5>Общий итог</h5> <span>{totalPrice + deliveryCost} ₽</span>
            </div>
          </div>

          <Link to="/cart-success" onClick={clearCart}>
            <Button appearence="big">Оформить</Button>
          </Link>
        </>
      )}
    </>
  );
}

export default Cart;














// <div className={styles['promo']}>
//   <label htmlFor="promo">
//     <input type="text" id='promo' placeholder="Промокод" className={styles['promo-input']} />
//     <Button appearence='small' className={styles['promo-btn']}> Применить </Button>

//   </label>
// </div>
// <div className={styles['end']}>
// <div className={styles['rows']}><h5 className={styles['row']}>Стоимость </h5> <span> 100 P</span> </div>
// <div className={styles['rows']}><h5 className={styles['row']}>Доставка </h5> <span> 100 P</span> </div>
// <div className={styles['rows']}><h5 className={styles['row']}> Итог (2) </h5> <span> 100 P</span> </div>


// </div>

// <Link to='/cart-success'> 
// <Button appearence={'big'} className={styles['button-cart']}>Оформить</Button>

// </Link>

// </>
//   )
// }
