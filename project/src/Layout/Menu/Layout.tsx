import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./Layout.module.css";
import cn from "classnames";
import {useState} from 'react';
import { useEffect } from "react";

type User = {
    id: number; 
    email: string; 
    password: string; 
    accessToken: string; 
    name: string; 
    img: string; 
} | null 
 
export default function Layout() {
const  [userData, setUserData] = useState<User>(null);


useEffect(()=> {
const userDataFromStorage = JSON.parse(
    localStorage.getItem('userData') || 'null'
);
setUserData(userDataFromStorage);
},
[]
)




const navigate = useNavigate();
const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData"); 
    navigate("/auth/login")
}

    return (
<div className={styles["layout"]}>
            <div className={styles["sidebar"]}>
                <div className={styles["user"]}>
                    <img src={ userData?.img ? userData.img : 'img.png' } alt="" className={styles["img"]} />
                    <div className={styles["user"]}> {userData?.name} </div>
                    <p className={styles["email"]}>{userData?.email}</p>

                </div>
                <div className={styles["menu"]}>


                    <div className={styles["icondiv"]}>
                        <img src="/menuicon.svg" className={styles["icon"]} />
                        <NavLink to={"/"} className={({ isActive }) => cn(styles["link"],
                            { [styles.active]: isActive }
                            )}>  Меню </NavLink>
                </div>
                <div className={styles["icondiv"]}>
                    <img src="/carticon.svg" className={styles["icon"]} />
                    <NavLink to={"/cart"} className={({ isActive }) => cn(styles["link"],
                        { [styles.active]: isActive })}>Корзина <span className={styles["icon-span"]}> 10</span></NavLink>
                </div>



            </div>



            <Button appearence="small" className={styles["button"]}  onClick={handleLogout}>
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