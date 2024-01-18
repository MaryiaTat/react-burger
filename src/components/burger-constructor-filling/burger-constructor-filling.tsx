import { FC } from "react";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
// Components
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import { IngredientStub } from "../ingredient-stub/ingredient-stub";
// Types
import { IIngredientProps } from "../../utils/types";
// Styles
import styles from "./burger-constructor-filling.module.css";
// Hooks
import { useAppDispatch, useAppSelector } from "../../services/hooks";
// Actions
import { addConstructorIngredientFilling } from "../../services/burgerConstructor/actions";
// Constants
import { DragDropVariables } from "../../utils/constants";

interface BurgerConstructorFillingProps {
  ingredients: Array<IIngredientProps>;
}

export interface IConstructorElementProps {
  id: string;
  elementId: string;
}

type DragObject = {
  id: string;
};

const BurgerConstructorFilling: FC<BurgerConstructorFillingProps> = ({
  ingredients,
}) => {
  const dispatch = useAppDispatch();
  const constructorFilling = useAppSelector(
    (store) => store.constructorIngredients.constructorFilling
  );
  const [{ isOver }, dropRef] = useDrop({
    accept: DragDropVariables.INGREDIENT,
    drop(item: DragObject) {
      dispatch(
        addConstructorIngredientFilling({ id: uuidv4(), elementId: item?.id })
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className={styles.burger_filling} ref={dropRef}>
      {constructorFilling.length === 0 ? (
        <IngredientStub isOver={isOver} />
      ) : (
        constructorFilling.map(
          (ingredient: IConstructorElementProps, index: number) => {
            const element = ingredients?.find(
              (obj) => obj._id === ingredient.elementId
            );
            if (element) {
              return (
                <BurgerConstructorElement
                  key={ingredient.id}
                  element={element}
                  ingredient={ingredient}
                  index={index}
                />
              );
            } else {
              return null;
            }
          }
        )
      )}
    </div>
  );
};

export default BurgerConstructorFilling;
