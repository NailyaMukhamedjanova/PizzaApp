// import { NavLink } from "react-router-dom";
import styles from "./Menu.module.css";
// import cn from "classnames";
import Headling from "../../components/Headling/Headling";
// import ProductCard from "../../components/ProductCard/ProductCard";
import Input from "../../components/Input/Input";
import { useEffect, useState } from "react";
import axios, {AxiosError} from "axios"; 
import {Product} from "../../interfaces/product.interface"
import { MenuList } from "./MenuList/MenuList";

export function Menu() {

const [products, setProducts] = useState<Product[]>([]);
const [isLoading, setisLoading ] = useState<boolean>(false);
const [error, setError] = useState<string | undefined> (); 

const getMenu = async () => {

  try {
    setisLoading(true); 
    const {data} = await axios.get('/src/JSON/products.json')

    setProducts(data);
    setisLoading(false)

  } catch(e) {
    console.error(e);
    if (e instanceof AxiosError) setError(e.message);
    setisLoading(false);
    return; 

  }

}
useEffect(() => {
  getMenu(); 
}, []) 


  return (
    <>
      <div className={styles["product"]}>
        <Headling>Меню</Headling>
        <div className={styles["search"]}>
          <img
            className={styles["search-icon"]}
            src="./searchicon.svg"
            alt=""
          />
          <Input className={styles["input"]} isValid={false} />
        </div>
      </div>
      <div className={styles["menu"]}>

        <div> {error && <>{error}</>}</div>

    {!isLoading && < MenuList product={products}/>}
  {isLoading &&<>Загружаем</>}
      </div>
    </>
  );
}
