import styles from "./ProductCard.module.css";
import { ProductCardProps } from "./ProductCard.props";
// import {ProductCardProps} from "./ProductCard.props";
import {Link} from "react-router-dom"; 
import { UseCart } from "../../context/cardContext";

function ProductCard(props: ProductCardProps) {
  const {setCartItems} = UseCart(); 

 const addToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();

const cartItems = localStorage.getItem('cartItems');
const items = cartItems ? JSON.parse(cartItems) : {};
const productId = props.id;

if (items[productId]) {
  items[productId]++;
} else {
  items[productId] = 1;
}
localStorage.setItem('cartItems', JSON.stringify(items))



 };



  return (
    <Link to= {`/product/${props.id}`} className={styles['link']} >
    <div className={styles["card"]}>
      <div
        className={styles["head"]}
        style={{ backgroundImage: `url('${props.image}')` }}
      >
        <div className={styles["price"]}>
          {props.price}&nbsp;
          <span className={styles["currency"]}>₽</span>
        </div>
        <button className={styles["add-to-cart"]} onClick={addToCart}>
          <img src="/carticon.svg" alt="Добавить в корзину" />
        </button>
        <div className={styles["rating"]}>
          {props.rating}&nbsp;
          <img src="/star-icon.svg" alt="Иконка звезды" />
        </div>
      </div>
      <div className={styles["footer"]}>
        <div className={styles["title"]}>{props.title}</div>
        <div className={styles["description"]}>{props.description}</div>
      </div>
    </div>
     </Link>
  );
 
}

export default ProductCard;
