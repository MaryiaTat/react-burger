import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// Actions
import { addIngredient } from "../../services/ingredientDetails/actions";
// Components
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerConstructorFilling from "../../components/burger-constructor-filling/burger-constructor-filling";
import OrderDetails from "../../components/order-details/order-details";
import Modal from "../../components/modal/modal";
// Styles
import styles from "./home-page.module.css";
// Utils
import { IIngredientProps } from "../../utils/types";
// Hooks
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { deleteOrder } from "../../services/order/actions";
import { clearConstructor } from "../../services/burgerConstructor/actions";

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const { ingredients, loading } = useAppSelector((store) => store.ingredients);
  const orderNumber = useAppSelector((store) => store.order.orderNumber);

  const handleAddIngredient = (id: string) => {
    const ingredientInfo = ingredients?.find(
      (el: IIngredientProps) => el._id === id
    );
    dispatch(addIngredient(ingredientInfo));
  };
  const closeOrderModal = () => {
    dispatch(deleteOrder());
    dispatch(clearConstructor());
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <article className={styles.article}>
        <h1 className={styles.title}>Соберите бургер</h1>
        {!loading && (
          <div className={styles.wrapper}>
            <BurgerIngredients
              ingredients={ingredients}
              onClickDetailInfo={handleAddIngredient}
            />
            <BurgerConstructor ingredients={ingredients}>
              <BurgerConstructorFilling ingredients={ingredients} />
            </BurgerConstructor>
          </div>
        )}
      </article>
      {orderNumber && (
        <Modal closeModal={closeOrderModal}>
          <OrderDetails orderId={orderNumber} />
        </Modal>
      )}
    </DndProvider>
  );
};

export default HomePage;
