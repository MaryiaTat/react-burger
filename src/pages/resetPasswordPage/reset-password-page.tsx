import { FC, ChangeEvent, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// Components
import Form from "../../components/form/form";
// Utils
import { postResetPasswordApi } from "../../utils/burger-api";

const ResetPasswordPage: FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    password: "",
    token: "",
  });
  const saveChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postResetPasswordApi(userInfo).then(
      (res) => res.success && navigate("/login")
    );
  };
  const pageStructure = {
    title: "Восстановление пароля",
    form: [
      {
        placeholder: "Введите новый пароль",
        type: "password",
        value: userInfo.password,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setUserInfo({ ...userInfo, password: e.target.value });
        },
      },
      {
        placeholder: "Введите код из письма",
        type: "text",
        value: userInfo.token,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setUserInfo({ ...userInfo, token: e.target.value });
        },
      },
    ],
    buttons: [{ title: "Сохранить", type: "primary", htmlTypeSubmit: true }],
    notifications: [
      { title: "Вспомнили пароль?", link: { title: "Войти", url: "/login" } },
    ],
    showButtons: true,
    onsubmit: saveChanges,
  };
  return <Form structure={pageStructure} />;
};

export default ResetPasswordPage;
