import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useState, ChangeEvent, FormEvent } from "react";
import { Route, Routes, NavLink } from "react-router-dom";
// Actions
import { updateUserInfo, logOut } from "../../services/user/actions";
// Components
import Form from "../../components/form/form";
// Hooks
import { useAppDispatch, useAppSelector } from "../../services/hooks";
// Styles
import styles from "./profile-page.module.css";

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store?.user);
  const [isShowButtons, setIsShowButtons] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });
  const cancelChanges = () =>
    setUserInfo({ name: user.name, email: user.email, password: "" });
  const saveChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserInfo(userInfo));
  };
  const logOutUser = () => {
    dispatch(logOut());
  };
  const pageStructure = {
    form: [
      {
        placeholder: "Имя",
        type: "text",
        value: userInfo.name,
        icon: true,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setUserInfo({ ...userInfo, name: e.target.value });
          setIsShowButtons(true);
        },
      },
      {
        placeholder: "E-mail",
        type: "email",
        value: userInfo.email,
        icon: true,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setUserInfo({ ...userInfo, email: e.target.value });
          setIsShowButtons(true);
        },
      },
      {
        placeholder: "Пароль",
        type: "password",
        value: userInfo.password,
        icon: true,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
          setUserInfo({ ...userInfo, password: e.target.value });
          setIsShowButtons(true);
        },
      },
    ],
    buttons: [
      {
        title: "Отмена",
        type: "secondary",
        onClick: cancelChanges,
      },
      {
        title: "Сохранить",
        type: "primary",
        htmlTypeSubmit: true,
      },
    ],
    showButtons: isShowButtons,
    onsubmit: saveChanges,
  };
  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <section className={styles.navigation}>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
            to="/profile"
            end
          >
            Профиль
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
            to="/profile/orders"
            end
          >
            История заказов
          </NavLink>
          <Button
            className={styles.link}
            htmlType="button"
            type="secondary"
            onClick={logOutUser}
          >
            Выход
          </Button>
        </section>
        <p className={styles.note}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </aside>
      <div className={styles.fragment}>
        <Routes>
          <Route path="/" element={<Form structure={pageStructure} />} />
          <Route
            path="orders"
            element={<div>Здесь будет история заказов пользователя</div>}
          />
        </Routes>
      </div>
    </main>
  );
};

export default ProfilePage;
