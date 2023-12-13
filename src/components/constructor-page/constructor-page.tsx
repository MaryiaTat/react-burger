import { FC, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// Actions
import { getIngredients } from "../../services/ingredients/actions";
import {
  addIngredient,
  deleteIngredient,
} from "../../services/ingredientDetails/actions";
// Components
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerConstructorFilling from "../burger-constructor-filling/burger-constructor-filling";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
// Styles
import styles from "./constructor-page.module.css";
// Utils
import { IngredientProps } from "../../utils/types";
// Hooks
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { deleteOrder } from "../../services/order/actions";
import { clearConstructor } from "../../services/burgerConstructor/actions";

const ConstructorPage: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  const { ingredients, loading } = useAppSelector((store) => store.ingredients);
  const ingredient = useAppSelector(
    (store) => store.ingredientDetails.ingredient
  );
  const orderNumber = useAppSelector((store) => store.order.orderNumber);

  const handleAddIngredient = (id: string) => {
    const ingredientInfo = ingredients?.find(
      (el: IngredientProps) => el._id === id
    );
    dispatch(addIngredient(ingredientInfo));
  };

  const closeIngredientModal = () => {
    dispatch(deleteIngredient());
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
      {ingredient && (
        <Modal closeModal={closeIngredientModal} title="Детали ингредиента">
          <IngredientDetails
            title={ingredient.name}
            image={ingredient.image_large}
            calories={ingredient.calories}
            fat={ingredient.fat}
            proteins={ingredient.proteins}
            carbohydrates={ingredient.carbohydrates}
          />
        </Modal>
      )}
      {orderNumber && (
        <Modal closeModal={closeOrderModal}>
          <OrderDetails orderId={orderNumber} />
        </Modal>
      )}
    </DndProvider>
  );
};

export default ConstructorPage;
