import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
// Components
import Form from "../../components/form/form";
// Utils
import { postForgotPasswordApi } from "../../utils/burger-api";
// Hooks

const ForgotPasswordPage: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const restorePassword = () => {
    postForgotPasswordApi({ email: email }).then(
      (res) => res.success && navigate("/reset-password")
    );
  };
  const pageStructure = {
    title: "Восстановление пароля",
    form: [
      {
        placeholder: "E-mail",
        type: "email",
        value: email,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        },
      },
    ],
    buttons: [
      {
        title: "Восстановить",
        type: "primary",
        onClick: restorePassword,
      },
    ],
    notifications: [
      { title: "Вспомнили пароль?", link: { title: "Войти", url: "/login" } },
    ],
    showButtons: true,
  };
  return <Form structure={pageStructure} />;
};

export default ForgotPasswordPage;
