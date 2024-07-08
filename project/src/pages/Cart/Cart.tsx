// import { Link, NavLink } from "react-router-dom";
// import cn from 'classnames';
// import styles from '../Menu/Menu.module.css'
import Headling from "../../components/Headling/Headling";
import styles from "./Cart.module.css"
import { Button } from "../../components/Button/Button";
import {Link} from 'react-router-dom';



export function Cart() {
  return (
    <>

   <Headling>Корзина</Headling>
<div className={styles['products']}>
  <div className={styles['product']}>
    <img src="./demo.png" alt="pizza img" className={styles['img']} />
    <div className={styles['produc-desc']}>
      <h3>Aццки острая</h3>
      <span className={styles['product-price']}></span>
    </div>
    <div className={styles['product-buttons']}>
      <button className={styles['decrement']}>-</button>
      <span className={styles['amount']}>01</span>
      <button className={styles['increment']}>+</button>
      <button className={styles['delete-btn']}>Х</button>



    </div>
  </div>
  <div className={styles['product']}>
    <img src="./demo.png" alt="pizza img" className={styles['img']} />
    <div className={styles['produc-desc']}>
      <h3>Aццки острая</h3>
      <span className={styles['product-price']}></span>
    </div>
    <div className={styles['product-buttons']}>
      <button className={styles['decrement']}>-</button>
      <span className={styles['amount']}>01</span>
      <button className={styles['increment']}>+</button>
      <button className={styles['delete-btn']}>Х</button>



    </div>
  </div>


</div>
<div className={styles['promo']}>
  <label htmlFor="promo">
    <input type="text" id='promo' placeholder="Промокод" className={styles['promo-input']} />
    <Button appearence='small' className={styles['promo-btn']}> Применить </Button>

  </label>
</div>
<div className={styles['end']}>
<div className={styles['rows']}><h5 className={styles['row']}>Стоимость </h5> <span> 100 P</span> </div>
<div className={styles['rows']}><h5 className={styles['row']}>Доставка </h5> <span> 100 P</span> </div>
<div className={styles['rows']}><h5 className={styles['row']}> Итог (2) </h5> <span> 100 P</span> </div>


</div>

<Link to='/cart-success'> 
<Button appearence={'big'} className={styles['button-cart']}>Оформить</Button>

</Link>

</>
  )
}
