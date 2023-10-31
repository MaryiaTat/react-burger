import { FC } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientProps } from "../app/appTypes";
import { IngredientsVariant } from "../burger-ingredients/burger-ingredients.constants";
import styles from "./burger-constructor.module.css";

interface BurgerConstructorProps {
  ingredients: Array<IngredientProps>;
  openModal: () => void;
}

const BurgerConstructor: FC<BurgerConstructorProps> = ({
  openModal,
  ingredients,
}) => {
  const getRandomElements = (array: Array<IngredientProps>, count: number) => {
    const randomElements = array
      .map((element: IngredientProps) => element)
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
    return randomElements;
  };
  const randomIngredients = getRandomElements(
    ingredients?.filter((item) => item.type !== IngredientsVariant.BUN),
    6
  );
  const randomBun = getRandomElements(
    ingredients?.filter((item) => item.type === IngredientsVariant.BUN),
    1
  );

  return (
    <section className={styles.burger_constructor_wrapper}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${randomBun[0].name} (верх)`}
        price={randomBun[0].price}
        thumbnail={randomBun[0].image}
      />
      <div className={styles.burger_filling}>
        {randomIngredients?.map((el) => (
          <ConstructorElement
            key={el._id}
            text={el.name}
            price={el.price}
            thumbnail={el.image}
          />
        ))}
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${randomBun[0].name} (низ)`}
        price={randomBun[0].price}
        thumbnail={randomBun[0].image}
      />
      <footer className={styles.footer}>
        <div className={styles.price_wrapper}>
          <span className={styles.price}>610</span>
          <div className={styles.icon}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={openModal}
        >
          Оформить заказ
        </Button>
      </footer>
    </section>
  );
};

export default BurgerConstructor;
