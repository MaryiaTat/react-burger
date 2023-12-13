import { FC } from "react";
import { useDrag } from "react-dnd";
// Components
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsVariant, DragDropVariables } from "../../utils/constants";
// Styles
import styles from "./burger-ingredient-card.module.css";

interface BurgerIngredientCardProps {
  id: string;
  image: string;
  price: number;
  name: string;
  type: string;
  burgerElementsId: string[];
  onClickDetailInfo: (id: string) => void;
}

const BurgerIngredientCard: FC<BurgerIngredientCardProps> = ({
  id,
  image,
  price,
  name,
  type,
  burgerElementsId,
  onClickDetailInfo,
}) => {
  const idCountMap = burgerElementsId.reduce((map: any, id: string) => {
    map.set(id, (map.get(id) || 0) + 1);
    return map;
  }, new Map());

  let count = idCountMap.get(id);
  const [, dragRef] = useDrag({
    type:
      type === IngredientsVariant.BUN
        ? DragDropVariables.BUN
        : DragDropVariables.INGREDIENT,
    item: { id },
  });

  const handleIngredientCard = () => {
    onClickDetailInfo(id);
  };

  return (
    <div
      className={styles.ingredient_card}
      ref={dragRef}
      onClick={handleIngredientCard}
    >
      <img className={styles.image} src={image} alt="" />
      <div className={styles.price_info}>
        <span className={styles.price}>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.ingredient_title}>{name}</p>
      {count && <Counter count={count} size="default" extraClass="counter" />}
    </div>
  );
};

export default BurgerIngredientCard;
