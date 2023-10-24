import { FC } from "react";
import styles from "./ingredient-details.module.css";

interface IngredientDetailsProps {
  title: string;
  image: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

const IngredientDetails: FC<IngredientDetailsProps> = ({
  image,
  title,
  calories,
  proteins,
  fat,
  carbohydrates,
}) => (
  <div className={styles.details}>
    <img className={styles.image} src={image} alt="" />
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.energy_values}>
      <div className={styles.energy_value}>
        <h4 className={styles.sub_title}>Калории, ккал</h4>
        <span className={styles.quantity}>{calories}</span>
      </div>
      <div className={styles.energy_value}>
        <h4 className={styles.sub_title}>Белки, г</h4>
        <span className={styles.quantity}>{proteins}</span>
      </div>
      <div className={styles.energy_value}>
        <h4 className={styles.sub_title}>Жиры, г</h4>
        <span className={styles.quantity}>{fat}</span>
      </div>
      <div className={styles.energy_value}>
        <h4 className={styles.sub_title}>Углеводы, г</h4>
        <span className={styles.quantity}>{carbohydrates}</span>
      </div>
    </div>
  </div>
);

export default IngredientDetails;
