import { FC } from "react";
// Styles
import styles from "./burger-ingredients-category.module.css";
// Components
import BurgerIngredientCard from "../burger-ingredient-card/burger-ingredient-card";
// Constants
import { IngredientProps } from "../../utils/types";

interface PropsT {
  title: string;
  data: IngredientProps[];
  category: string;
  id: string;
  innerRef: any;
  burgerElementsId: string[];
  onClickDetailInfo: (id: string) => void;
}

const BurgerIngredientsCategory: FC<PropsT> = ({
  id,
  innerRef,
  title,
  data,
  category,
  burgerElementsId,
  onClickDetailInfo,
}) => (
  <section ref={innerRef} id={id} className={styles.category_wrapper}>
    <h2 className={styles.title}>{title}</h2>
    <div className={styles.ingredients_wrapper}>
      {data
        ?.filter((item) => item.type === category)
        .map((item) => (
          <BurgerIngredientCard
            key={item._id}
            id={item._id}
            image={item.image}
            price={item.price}
            name={item.name}
            type={item.type}
            onClickDetailInfo={onClickDetailInfo}
            burgerElementsId={burgerElementsId}
          />
        ))}
    </div>
  </section>
);

export default BurgerIngredientsCategory;
