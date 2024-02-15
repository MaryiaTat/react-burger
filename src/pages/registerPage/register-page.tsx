import { ChangeEvent, FC, useState, FormEvent } from "react";
// Actions
import { register } from "../../services/user/actions";
// Components
import Form from "../../components/form/form";
import { useAppDispatch } from "../../services/hooks";

const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(userInfo)(dispatch);
  };

  const pageStructure = {
    title: "Регистрация",
    form: [
      {
        placeholder: "Имя",
        type: "text",
        value: userInfo.name,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setUserInfo({ ...userInfo, name: e.target.value });
        },
      },
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
    buttons: [
      {
        title: "Зарегистрироваться",
        type: "primary",
        htmlTypeSubmit: true,
      },
    ],
    notifications: [
      {
        title: "Уже зарегистрированы?",
        link: { title: "Войти", url: "/login" },
      },
    ],
    showButtons: true,
    onsubmit: registerHandler,
  };
  return (
    <div>
      <Form structure={pageStructure} />
    </div>
  );
};

export default RegisterPage;
