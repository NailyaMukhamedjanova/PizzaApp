// import { NavLink } from "react-router-dom";
import styles from "./Menu.module.css";
// import cn from "classnames";
import Headling from "../../components/Headling/Headling";
// import ProductCard from "../../components/ProductCard/ProductCard";
import Input from "../../components/Input/Input";
import { ChangeEvent, useEffect, useState } from "react";
import axios, {AxiosError} from "axios"; 
import {Product} from "../../interfaces/product.interface"
import { MenuList } from "./MenuList/MenuList";
import { isInputElement } from "react-router-dom/dist/dom";


export function Menu() {

const [products, setProducts] = useState<Product[]>([]);
const [isLoading, setisLoading ] = useState<boolean>(false);
const [error, setError] = useState<string | undefined> (); 
const [filter, setFilter] = useState<string>('');

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
const filterProdyctsByIngredients = (product:Product, ingredients:string) => {
  return product.ingredients.some((item) => 
    item.toLowerCase().includes(ingredients.toLowerCase())
  );
}
const filterProductByName = (product: Product, name: string) => {
  return product.name.toLowerCase().includes(name.toLowerCase())
}

const filterProducts = products.filter( product => 
  filterProdyctsByIngredients(product, filter) || filterProductByName(product, filter)

)


const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
  setFilter(e.target.value);


}


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
          <Input className={styles["input"]} isValid={false}  onChange={updateFilter}/>
        </div>
      </div>
      <div className={styles["menu"]}>

        <div> {error && <>{error}</>}</div>

    {!isLoading && < MenuList product={filterProducts}/>}
  {isLoading &&<>Загружаем</>}
      </div>
    </>
  );
}
