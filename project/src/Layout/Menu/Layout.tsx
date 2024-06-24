import { NavLink, Outlet } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./Layout.module.css";
import cn from "classnames"
 
export default function Layout() {
    return (
<div className={styles["layout"]}>
            <div className={styles["sidebar"]}>
                <div className={styles["user"]}>
                    <img src="./public/img.png" alt="" className={styles["img"]} />
                    <div className={styles["user"]}> Наиля Мухамеджанова </div>
                    <p className={styles["email"]}>example@ya.ru</p>

                </div>
                <div className={styles["menu"]}>


                    <div className={styles["icondiv"]}>
                        <img src="./public/menuicon.svg" className={styles["icon"]} />
                        <NavLink to={"/"} className={({ isActive }) => cn(styles["link"],
                            { [styles.active]: isActive }
                            )}>  Меню </NavLink>
                </div>
                <div className={styles["icondiv"]}>
                    <img src="./public/carticon.svg" className={styles["icon"]} />
                    <NavLink to={"/cart"} className={({ isActive }) => cn(styles["link"],
                        { [styles.active]: isActive })}>Корзина</NavLink>
                </div>



            </div>



            <Button appearence="small" className={styles["button"]}>
                <img src="./public/buttonicon.svg" className={styles['buttonicon']} />
                Выход
            </Button>


        </div>
        <div className={styles['content']}>
                <Outlet />
            </div>

     

    </div>
    )
}