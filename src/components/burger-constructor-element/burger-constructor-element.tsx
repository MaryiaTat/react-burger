import { FC, useRef } from "react";
import type { XYCoord } from "dnd-core";
import { useDrag, useDrop } from "react-dnd";
// Components
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
// Utils
import { IngredientProps } from "../../utils/types";
// Styles
import styles from "./burger-constructor-element.module.css";
// Actions
import {
  deleteConstructorIngredientFilling,
  sortConstructorIngredient,
} from "../../services/burgerConstructor/actions";
// Constants
import drapeIcon from "../../images/drape.svg";
import { DragDropVariables } from "../../utils/constants";
// Hooks
import { useAppDispatch } from "../../services/hooks";

interface BurgerConstructorElementProps {
  ingredient: ConstructorElementProps;
  element: IngredientProps;
  index: number;
}

interface ConstructorElementProps {
  id: string;
  elementId: string;
}

const BurgerConstructorElement: FC<BurgerConstructorElementProps> = ({
  ingredient,
  element,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { id } = ingredient;
  const dispatch = useAppDispatch();

  const [, drop] = useDrop({
    accept: DragDropVariables.ELEMENT,
    hover: (item: any, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(sortConstructorIngredient({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DragDropVariables.ELEMENT,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const deleteConstructorIngredient = (id: string) =>
    dispatch(deleteConstructorIngredientFilling(id));
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} className={styles.container} style={{ opacity }}>
      <img src={drapeIcon} className={styles.image} alt="" />
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image}
        handleClose={() => deleteConstructorIngredient(ingredient.id)}
      />
    </div>
  );
};

export default BurgerConstructorElement;
