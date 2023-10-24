import { FC, useState } from "react";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from "./constructor-page.module.css";
import { IngredientProps } from "../app/appTypes";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

interface ConstructorPageProps {
  data: Array<IngredientProps>;
}

const ConstructorPage: FC<ConstructorPageProps> = ({ data }) => {
  const [idIngredient, setIdIngredient] = useState<string>("");
  const [isIngredientDetailsModalOpen, setIsIngredientDetailsModalOpen] =
    useState(false);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);

  const handleIdIngredient = (id: string) => setIdIngredient(id);
  const ingredientInfo = data.find((el) => el._id === idIngredient);

  const openIngredientModal = () => {
    setIsIngredientDetailsModalOpen(true);
  };
  const closeIngredientModal = () => {
    setIsIngredientDetailsModalOpen(false);
  };
  const openOrderModal = () => {
    setIsOrderDetailsModalOpen(true);
  };
  const closeOrderModal = () => {
    setIsOrderDetailsModalOpen(false);
  };

  return (
    <>
      <article
        className={styles.wrapper}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          margin: "0 20px",
        }}
      >
        <h1 className={styles.title}>Соберите бургер</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "40px",
            justifyContent: "space-between",
          }}
        >
          <BurgerIngredients
            ingredients={data}
            onClickDetailInfo={handleIdIngredient}
            openModal={openIngredientModal}
          />
          <BurgerConstructor ingredients={data} openModal={openOrderModal} />
        </div>
      </article>
      {isIngredientDetailsModalOpen && (
        <Modal closeModal={closeIngredientModal} title="Детали ингредиента">
          {ingredientInfo && (
            <IngredientDetails
              title={ingredientInfo.name}
              image={ingredientInfo.image_large}
              calories={ingredientInfo.calories}
              fat={ingredientInfo.fat}
              proteins={ingredientInfo.proteins}
              carbohydrates={ingredientInfo.carbohydrates}
            />
          )}
        </Modal>
      )}
      {isOrderDetailsModalOpen && (
        <Modal closeModal={closeOrderModal}>
          <OrderDetails orderId={34536} />
        </Modal>
      )}
    </>
  );
};

export default ConstructorPage;
