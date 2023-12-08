import { FC, useMemo } from "react";
import { useDrop } from "react-dnd";
// Components
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  IngredientStub,
  IngredientStubTypes,
} from "../ingredient-stub/ingredient-stub";
// Utils
import { IngredientProps, ConstructorFillingTypes } from "../../utils/types";
import { DragDropVariables } from "../../utils/constants";
// Actions
import { addConstructorIngredientBun } from "../../services/burgerConstructor/actions";
import { postOrder } from "../../services/order/actions";
// Hooks
import { useAppDispatch, useAppSelector } from "../../services/hooks";
// Styles
import styles from "./burger-constructor.module.css";

interface BurgerConstructorProps {
  ingredients: Array<IngredientProps>;
  children: JSX.Element;
}

type DropTypes = {
  id: string;
};

const BurgerConstructor: FC<BurgerConstructorProps> = ({
  ingredients,
  children,
}) => {
  const dispatch = useAppDispatch();
  const { bun, constructorFilling } = useAppSelector(
    (store) => store.constructorIngredients
  );
  const [{ isOver }, dropRef] = useDrop({
    accept: DragDropVariables.BUN,
    drop(item: DropTypes) {
      dispatch(addConstructorIngredientBun(item?.id));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const currrentBun = useMemo(
    () => ingredients?.find((obj) => obj._id === bun),
    [ingredients, bun]
  );
  const currentFilling: string[] = useMemo(
    () =>
      constructorFilling?.map((el: ConstructorFillingTypes) => el.elementId),
    [constructorFilling]
  );
  const currentBurger = useMemo(
    () => (bun ? [bun, ...currentFilling, bun] : [...currentFilling]),
    [currentFilling, bun]
  );

  const totalPrice = useMemo(() => {
    const currentBurgerIngredients = currentBurger?.map((item: string) =>
      ingredients?.find((ing) => item === ing._id)
    );
    return currentBurgerIngredients?.reduce(
      (acc, item) => (item ? acc + item?.price : 0),
      0
    );
  }, [currentBurger, ingredients]);

  const postOrderModal = () => {
    dispatch(postOrder({ ingredients: currentBurger }));
  };

  return (
    <section className={styles.burger_constructor_wrapper}>
      <div ref={dropRef}>
        {currrentBun ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${currrentBun.name} (верх)`}
            price={currrentBun.price}
            thumbnail={currrentBun.image}
            extraClass={styles.buns}
          />
        ) : (
          <IngredientStub type={IngredientStubTypes.TOP} isOver={isOver} />
        )}
      </div>
      {children}
      {currrentBun ? (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${currrentBun.name} (низ)`}
          price={currrentBun.price}
          thumbnail={currrentBun.image}
          extraClass={styles.buns}
        />
      ) : (
        <IngredientStub type={IngredientStubTypes.BOTTOM} isOver={isOver} />
      )}

      <footer className={styles.footer}>
        <div className={styles.price_wrapper}>
          <span className={styles.price}>{totalPrice}</span>
          <div className={styles.icon}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={postOrderModal}
        >
          Оформить заказ
        </Button>
      </footer>
    </section>
  );
};

export default BurgerConstructor;
