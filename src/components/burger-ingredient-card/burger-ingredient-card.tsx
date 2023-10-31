import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient-card.module.css";

interface BurgerIngredientCardProps {
  id: string;
  image: string;
  price: number;
  name: string;
  count?: number;
  openModal: () => void;
  onClickDetailInfo: (id: string) => void;
}

const BurgerIngredientCard: FC<BurgerIngredientCardProps> = ({
  id,
  image,
  price,
  name,
  count,
  openModal,
  onClickDetailInfo,
}) => {
  const handleIngredientCard = () => {
    openModal();
    onClickDetailInfo(id);
  };
  return (
    <div className={styles.ingredient_card} onClick={handleIngredientCard}>
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
