import { FC } from "react";
// Components
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import CompositionElement from "../composition-element/composition-element";
// Constants
import styles from "./burger-info.module.css";
import { IIngredientProps, IIngredientWithQuantity } from "../../utils/types";
import { useAppSelector } from "../../services/hooks";
import { getOrderDate, getOrderTime, getStatus } from "../../utils/utils";
import { StatusConstants } from "../../utils/constants";

interface BurgerInfoProps {
  number: string;
  title: string;
  date: string;
  buregerIngredients: Array<string>;
  status: StatusConstants | "";
}

const BurgerInfo: FC<BurgerInfoProps> = ({
  number,
  title,
  date,
  buregerIngredients,
  status,
}) => {
  const { ingredients } = useAppSelector((store) => store.ingredients);
  const currentStatus = getStatus(status);
  const allIngredientsMap = new Map();
  ingredients.forEach((obj: IIngredientProps) => {
    allIngredientsMap.set(obj._id, obj);
  });

  const burgerIngredientsWithQuantity = buregerIngredients.reduce(
    (map: Map<string, number>, id: string) => {
      map.set(id, (map.get(id) || 0) + 1);
      return map;
    },
    new Map()
  );

  let fullBurgerDescription: Array<IIngredientWithQuantity> = [];
  burgerIngredientsWithQuantity.forEach((value, key) => {
    fullBurgerDescription = [
      ...fullBurgerDescription,
      { ...allIngredientsMap?.get(key), quantity: value },
    ];
  });

  const currentBurgerPrice = fullBurgerDescription.reduce(
    (sum: number, ingredient: IIngredientWithQuantity) => {
      const ingredientSum = ingredient.quantity * ingredient.price;
      return ingredientSum ? sum + ingredientSum : 0;
    },
    0
  );

  const orderDate = getOrderDate(date);
  const orderTime = getOrderTime(date);

  return (
    <section className={styles.wrapper}>
      <span className={styles.number}>#{number}</span>
      <span className={styles.title}>{title}</span>
      <span className={`${styles.status} ${styles.ready}`}>
        {currentStatus}
      </span>
      <span className={styles.title}>Состав:</span>
      <div className={styles.ingredients}>
        {fullBurgerDescription.map((el, index) => (
          <CompositionElement
            key={index}
            image={el.image}
            title={el.name}
            quantity={el.quantity}
            price={el.price}
          />
        ))}
      </div>
      <footer className={styles.footer}>
        <span className={styles.date}>
          {orderDate}, {orderTime}
        </span>
        <div className={styles.price_wrapper}>
          <span className={styles.price}>{currentBurgerPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </footer>
    </section>
  );
};

export default BurgerInfo;
