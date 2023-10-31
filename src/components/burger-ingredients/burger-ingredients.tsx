import { FC, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
// Components
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
// Constants
import { IngredientsVariant } from "./burger-ingredients.constants";
import { IngredientProps } from "../app/appTypes";

interface BurgerIngredientsProps {
  ingredients: Array<IngredientProps>;
  onClickDetailInfo: (id: string) => void;
  openModal: () => void;
}

const BurgerIngredients: FC<BurgerIngredientsProps> = ({
  ingredients,
  onClickDetailInfo,
  openModal,
}) => {
  const [currentTabValue, setCurrentTabValue] = useState(
    IngredientsVariant.BUN.toString()
  );
  const handleChangeCategory = (value: string) => {
    setCurrentTabValue(value);
    const element = document.getElementById(value);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
  const burgerIngredientsStructure = [
    { id: 1, title: "Булки", category: IngredientsVariant.BUN },
    { id: 2, title: "Соусы", category: IngredientsVariant.SAUCE },
    { id: 3, title: "Начинки", category: IngredientsVariant.FILLINGS },
  ];

  return (
    <section className={styles.burger_ingredients_wrapper}>
      <div className={styles.tabs}>
        <Tab
          value={IngredientsVariant.BUN.toString()}
          active={currentTabValue === IngredientsVariant.BUN}
          onClick={handleChangeCategory}
        >
          Булки
        </Tab>
        <Tab
          value={IngredientsVariant.SAUCE.toString()}
          active={currentTabValue === IngredientsVariant.SAUCE}
          onClick={handleChangeCategory}
        >
          Соусы
        </Tab>
        <Tab
          value={IngredientsVariant.FILLINGS.toString()}
          active={currentTabValue === IngredientsVariant.FILLINGS}
          onClick={handleChangeCategory}
        >
          Начинки
        </Tab>
      </div>
      <article className={styles.ingredients}>
        {burgerIngredientsStructure.map((el) => (
          <BurgerIngredientsCategory
            key={el.id}
            id={el.category}
            category={el.category}
            title={el.title}
            data={ingredients}
            openModal={openModal}
            onClickDetailInfo={onClickDetailInfo}
          />
        ))}
      </article>
    </section>
  );
};

export default BurgerIngredients;
