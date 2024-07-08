import { Button } from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import usersData from '../../JSON/users.json';
import { FormEvent, useState } from 'react';
export type LoginForm = {
  email: { value: string;} ;
  password: {
   value: string; 
  }
}

export default function Login() {
  const [error, setError] = useState<string | null>();
  const navigate = useNavigate();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & LoginForm; 
    const { email, password } = target;

    const user = usersData.find(
      (user) => email.value === user.email && user.password === password.value
    );
    if (user) {
      localStorage.setItem('accessToken', user.accessToken);
      localStorage.setItem('userData', JSON.stringify(user));
      navigate('/');
    } else {
      setError('Неправильный email или пароль');
      return;
    }
  };
  return (
    <div className={styles['login']}>
      <Headling>Вход</Headling>
      {error && <div className={styles['error']}> {error} </div> }
      <form className={styles['form']} onSubmit={submit}>
        <div className={styles['field']}>
          <label className={styles['label']} htmlFor="email">
            Ваш Email{' '}
          </label>
          <Input id="email" name="email" placeholder="Email" isValid={false} />
        </div>
        <div className={styles['field']}>
          <label htmlFor="password" className={styles['label']}>
            Ваш email
          </label>
          <Input
            isValid={false}
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <Button appearence="big"> Вход</Button>
        <div>Нет аккаунта?</div>
        <Link to="/auth/register">Зарегистрироваться</Link>
      </form>
    </div>
  );
}
