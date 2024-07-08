
import { Button } from "../../components/Button/Button";
import { Link } from "react-router-dom";
import styles from './SuccessOrder.module.css';

export default function SuccessOrder() {
    return (
    <div className={styles['container']}>
    <img src="./public/succOrder.png" alt="" />
    <h1> Ваш заказ успешно оформлен! </h1>
    <Link to='/'>
    <Button appearence="big">Сделать новый</Button>
    </Link>
   </div>
  
    )
}