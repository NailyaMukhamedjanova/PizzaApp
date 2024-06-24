import { MenuListProps } from "./menuList.props";
import styles from './MenuList.module.css'
import ProductCard from "../../../components/ProductCard/ProductCard";

export function MenuList({product}: MenuListProps ) {
    return <div className={styles["wrapper"]}> 
      {product.map( (p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          title={p.name}
          description={p.ingredients.join(', ')}
          image={p.image}
          price={p.price}
          rating={p.rating}
        />
  ) )}
    
    </div>

}