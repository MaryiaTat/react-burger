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
  const restorePassword = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
        htmlTypeSubmit: true,
      },
    ],
    notifications: [
      { title: "Вспомнили пароль?", link: { title: "Войти", url: "/login" } },
    ],
    showButtons: true,
    onsubmit: restorePassword,
  };
  return <Form structure={pageStructure} />;
};

export default ForgotPasswordPage;
