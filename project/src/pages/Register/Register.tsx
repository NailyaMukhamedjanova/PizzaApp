import { Button } from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


export interface RegisterForm {
   email: string, 
   password: string, 
   name: string, 
}

export interface User {
   id: number,
   email: string,
   password:string,
   name: string, 
   accessToken: string,

}

export default function Register() {
   const navigate = useNavigate(); 

  const [formData, setFormData] = useState <RegisterForm>({
    email: '',
    password: '',
    name: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
   e.preventDefault();
   const accessToken = generateToken();
   const newUser = {
      id: Math.floor(Math.random()*1000),
      email: formData.email,
      password: formData.password,
      name: formData.name, 
      accessToken: accessToken,
   }; 
   try {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem("userData", JSON.stringify(newUser))
      navigate("/");

   }
   catch(error) {
      console.error("ошибка регистрации", error);
   }
  }

  const generateToken = (): string => {
    return Math.random().toString(36).substr(2);
  };

  return (
    <div className={styles['login']} onSubmit={handleSubmit}>
      <Headling>Вход</Headling>
      <form className={styles['form']}>
        <div className={styles['field']}>
          <label className={styles['label']} htmlFor="email">
            Ваш Email{' '}
          </label>
          <Input id="email" name="email" placeholder="Email" isValid={false} onChange={handleChange} />
        </div>
        <div className={styles['field']}>
          <label htmlFor="password" className={styles['label']}>
            Ваш Пароль
          </label>
          <Input
            isValid={false}
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            onChange={handleChange}
          />
        </div>

        <div className={styles['field']}>
          <label htmlFor="password" className={styles['label']}>
            Ваше Имя
          </label>
          <Input
            isValid={false}
            id="name"
            name="name"
            type="text"
            placeholder="Ваше Имя"
            onChange={handleChange}
          />
        </div>
        <Button appearence="big"> Вход</Button>
        <div>Нет аккаунта?</div>
        <Link to="/auth/register">Зарегистрироваться</Link>
      </form>
    </div>
  );
}
