import { FC, useMemo, useState } from "react";
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
import OrderLoader from "../order-loader/order-loader";
import Modal from "../modal/modal";
import { OnlyAuth } from "../protected-route/protected-route";
// Utils
import { IIngredientProps, ConstructorFillingTypes } from "../../utils/types";
import { DragDropVariables } from "../../utils/constants";
// Actions
import { addConstructorIngredientBun } from "../../services/burgerConstructor/actions";
import { postOrder } from "../../services/order/actions";
// Hooks
import { useAppDispatch, useAppSelector } from "../../services/hooks";
// Styles
import styles from "./burger-constructor.module.css";

interface BurgerConstructorProps {
  ingredients: Array<IIngredientProps>;
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
  const loading = useAppSelector((store) => store.order.loading);
  const user = useAppSelector((store) => store.user.user);

  const [isUserAuth, setIsUserAuth] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(true);
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

  const currentBun = useMemo(
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
    const currentBurgerIngredients = currentBurger?.map(
      (item: string) => ingredients?.find((ing) => item === ing._id)
    );
    return currentBurgerIngredients?.reduce(
      (acc, item) => (item ? acc + item?.price : 0),
      0
    );
  }, [currentBurger, ingredients]);

  const postOrderModal = () => {
    setIsUserAuth(true);
    user && postOrder({ ingredients: currentBurger })(dispatch);
  };
  const closeLoader = () => setShowLoader(false);

  return (
    <section className={styles.burger_constructor_wrapper}>
      <div ref={dropRef}>
        {currentBun ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${currentBun.name} (верх)`}
            price={currentBun.price}
            thumbnail={currentBun.image}
            extraClass={styles.buns}
          />
        ) : (
          <IngredientStub type={IngredientStubTypes.TOP} isOver={isOver} />
        )}
      </div>
      {children}
      {currentBun ? (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${currentBun.name} (низ)`}
          price={currentBun.price}
          thumbnail={currentBun.image}
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
        {isUserAuth && (
          <OnlyAuth
            component={
              loading && showLoader ? (
                <Modal closeModal={closeLoader}>
                  <OrderLoader />
                </Modal>
              ) : null
            }
          />
        )}
      </footer>
    </section>
  );
};

export default BurgerConstructor;
