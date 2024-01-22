import { FC } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";
import { IIngredientProps } from "../../utils/types";
import styles from "./ingredient-details.module.css";

interface IngredientDetailsProps {
  header?: string;
}

const IngredientDetails: FC<IngredientDetailsProps> = ({ header }) => {
  const { ingredientId } = useParams();
  const { ingredients, loading } = useAppSelector((store) => store.ingredients);

  const currentIngredient = ingredients?.find(
    (el: IIngredientProps) => el._id === ingredientId
  );
  const { image, title, calories, proteins, fat, carbohydrates } =
    currentIngredient || {};

  return !loading ? (
    <div className={styles.wrapper}>
      {header && <h2 className={styles.header}>{header}</h2>}
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
    </div>
  ) : null;
};

export default IngredientDetails;
