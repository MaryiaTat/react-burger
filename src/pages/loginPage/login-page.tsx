import { FC, useState, ChangeEvent, FormEvent } from "react";
// Actions
import { login } from "../../services/user/actions";
// Components
import Form from "../../components/form/form";
import { useAppDispatch } from "../../services/hooks";
import { ILoginUserInfo } from "../../utils/types";

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState<ILoginUserInfo>({
    email: "",
    password: "",
  });
  const entrance = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(userInfo));
  };
  const pageStructure = {
    title: "Вход",
    form: [
      {
        placeholder: "E-mail",
        type: "email",
        value: userInfo.email,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setUserInfo({ ...userInfo, email: e.target.value });
        },
      },
      {
        placeholder: "Пароль",
        type: "password",
        value: userInfo.password,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setUserInfo({ ...userInfo, password: e.target.value });
        },
      },
    ],
    buttons: [{ title: "Войти", type: "primary", htmlTypeSubmit: true }],
    notifications: [
      {
        title: "Вы — новый пользователь?",
        link: { title: "Зарегистрироваться", url: "/register" },
      },
      {
        title: "Забыли пароль?",
        link: { title: "Восстановить пароль", url: "/forgot-password" },
      },
    ],
    showButtons: true,
    onsubmit: entrance,
  };
  return <Form structure={pageStructure} />;
};

export default LoginPage;
