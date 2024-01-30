import { FC, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// Components
import HomePage from "../../pages/homePage/home-page";
import FeedPage from "../../pages/feedPage/feed-page";
import OrderPage from "../../pages/orderPage/order-page";
import RegisterPage from "../../pages/registerPage/register-page";
import LoginPage from "../../pages/loginPage/login-page";
import AppHeader from "../app-header/app-header";
import ForgotPasswordPage from "../../pages/forgotPasswordPage/forgot-password-page";
import ResetPasswordPage from "../../pages/resetPasswordPage/reset-password-page";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ProfilePage from "../../pages/profilePage/profile-page";
import Modal from "../modal/modal";
import ProfileOrderPage from "../../pages/profileOrderPage/profile-order-page";
import { getIngredients } from "../../services/ingredients/actions";
// Styles
import styles from "./app.module.css";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { checkUserAuth } from "../../services/user/actions";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";

const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const background = location.state && location.state.background;

  // при входе на страницу проверяем токен доступа
  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="feed" element={<FeedPage />} />
        <Route path="feed/:orderId" element={<OrderPage />} />
        <Route
          path="ingredients/:ingredientId"
          element={<IngredientDetails header="Детали ингредиента" />}
        />
        <Route
          path="register"
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path="login"
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path="forgot-password"
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path="reset-password"
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route
          path="profile/*"
          element={<OnlyAuth component={<ProfilePage />} />}
        />
        <Route
          path="profile/orders/:orderId"
          element={<OnlyAuth component={<ProfileOrderPage />} />}
        />
        <Route path="*" element={<div>Страница не найдена. Ошибка 404!</div>} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="ingredients/:ingredientId"
            element={
              <Modal closeModal={handleModalClose} title="Детали ингредиента">
                <IngredientDetails />
              </Modal>
            }
          ></Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
