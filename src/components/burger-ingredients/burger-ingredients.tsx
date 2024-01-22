import { FC, useMemo, useState, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInView } from "react-intersection-observer";
import styles from "./burger-ingredients.module.css";
// Components
import BurgerIngredientsCategory from "../burger-ingredients-category/burger-ingredients-category";
// Constants
import { IngredientsVariant } from "../../utils/constants";
import { IIngredientProps, ConstructorFillingTypes } from "../../utils/types";
import { useAppSelector } from "../../services/hooks";

const burgerIngredientsStructure = [
  { id: 1, title: "Булки", category: IngredientsVariant.BUN },
  { id: 2, title: "Соусы", category: IngredientsVariant.SAUCE },
  { id: 3, title: "Начинки", category: IngredientsVariant.FILLINGS },
];

interface BurgerIngredientsProps {
  ingredients: Array<IIngredientProps>;
  onClickDetailInfo: (id: string) => void;
}

const BurgerIngredients: FC<BurgerIngredientsProps> = ({
  ingredients,
  onClickDetailInfo,
}) => {
  const { bun, constructorFilling } = useAppSelector(
    (store) => store.constructorIngredients
  );
  const burgerElementsId = useMemo(
    () => [
      bun,
      ...constructorFilling?.map(
        (item: ConstructorFillingTypes) => item.elementId
      ),
      bun,
    ],
    [bun, constructorFilling]
  );

  const [currentTabValue, setCurrentTabValue] = useState(
    IngredientsVariant.BUN.toString()
  );
  const handleChangeCategory = (value: string) => {
    setCurrentTabValue(value);
    const element = document.getElementById(value);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };
  const [refBun, inViewBun] = useInView({
    threshold: 0.3,
  });
  const [refSauce, inViewSauce] = useInView({
    threshold: 0.8,
  });
  const [refMain, inViewMain] = useInView({
    threshold: 0.3,
  });

  useEffect(() => {
    if (inViewBun) {
      setCurrentTabValue(IngredientsVariant.BUN);
    }
    if (inViewSauce) {
      setCurrentTabValue(IngredientsVariant.SAUCE);
    }
    if (inViewMain) {
      setCurrentTabValue(IngredientsVariant.FILLINGS);
    }
  }, [inViewBun, inViewSauce, inViewMain]);

  const currentRef = (category: string) => {
    if (category === IngredientsVariant.BUN) return refBun;
    else if (category === IngredientsVariant.SAUCE) return refSauce;
    else return refMain;
  };

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
            innerRef={currentRef(el.category)}
            category={el.category}
            title={el.title}
            data={ingredients}
            onClickDetailInfo={onClickDetailInfo}
            burgerElementsId={burgerElementsId}
          />
        ))}
      </article>
    </section>
  );
};

export default BurgerIngredients;
