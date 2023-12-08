import { FC } from "react";
import styles from "./ingredient-stub.module.css";

export enum IngredientStubTypes {
  TOP = "top",
  BOTTOM = "bottom",
}

interface IngredientStubProps {
  type?: IngredientStubTypes;
  isOver?: boolean;
}

export const IngredientStub: FC<IngredientStubProps> = ({ type, isOver }) => (
  <div
    className={`${styles.container} ${
      type === IngredientStubTypes.TOP
        ? styles.top
        : type === IngredientStubTypes.BOTTOM
        ? styles.bottom
        : ""
    }`}
    style={{ borderStyle: isOver ? "dashed solid" : "" }}
  >
    <span>{type ? "Выберите булки" : "Выберите начинку"}</span>
  </div>
);
