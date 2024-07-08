import { useParams } from "react-router-dom";
import style from "./Product.module.css";
import Headling from "../../components/Headling/Headling";
import { Button } from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import productsData from "../../JSON/products.json";
import { Product } from "../../interfaces/product.interface"; 


export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);

  const { id } = useParams();


  const addToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  
  const cartItems = localStorage.getItem('cartItems');
  const items = cartItems ? JSON.parse(cartItems) : {};
  const productId = Number(id);
  
  if (items[productId]) {
    items[productId]++;
  } else {
    items[productId] = 1;
  }
  localStorage.setItem('cartItems', JSON.stringify(items))
};
  

  useEffect(() => {
    const productId = Number(id);
    const selectedProduct = (productsData as Product[]).find(
      (product: Product) => product.id === productId
    );
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [id]);

  if (product) {
    return (
    <div>
      <div className={style["header"]}>
        <Link className={style["link"]} to="/">  <img src="/pointer.svg" alt="cтрелка" />  </Link>
        <Headling className={style["header-name"]}>{product.name}</Headling>
        <Button appearence={"small"} className={style["header-button"]} onClick= {addToCart}> <img src="/basket.svg"alt=""  className={style["header-button-img"]} /> В корзину</Button>
        </div>
        <div className={style["product-cart"]}>
          <img  className={style["product-img"]} src={product.image} alt="" />
          <div className={style["product-description"]} >
            
        
            <div className={style["product-price"]} >
          <p className={style["price"]}> Цена </p>
          <p className={style["price-number"]}>{product.price}<span className={style["currency"]}>₽</span></p>
          
        </div>
            

            <div className={style["rating"]}>
            <p> Рейтинг  </p>
            <div className={style["rating-star"]}>{product.rating}
          <img src="/star-icon.svg" alt="Иконка звезды" /></div>
         
        </div>
        <div className={style["description"]}> 
            <h3 className= {style["description-title"]}>Состав:</h3>
            <ul className= {style["description-text"]}>
              {product.ingredients.map((elem) => <li key={Math.floor(Math.random()*100)}>{elem}</li>)}
            
            </ul>
</div>
          
          </div>
        </div>
        
        <div className={style["layout"]}></div>
      </div>
    );
  } else {
    return <p>загрузка</p>;
  }
}
