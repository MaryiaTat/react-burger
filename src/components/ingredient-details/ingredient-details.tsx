import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getIngredients } from "../../services/ingredients/actions";
import { IngredientProps } from "../../utils/types";
import styles from "./ingredient-details.module.css";

interface IngredientDetailsProps {
  header?: string;
}

const IngredientDetails: FC<IngredientDetailsProps> = ({ header }) => {
  const { ingredientId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);
  const { ingredients, loading } = useAppSelector((store) => store.ingredients);

  const currentIngredient = ingredients?.find(
    (el: IngredientProps) => el._id === ingredientId,
  );
  const { image, title, calories, proteins, fat, carbohydrates } =
    currentIngredient || {};

  return !loading ? (
    <>
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
    </>
  ) : null;
};

export default IngredientDetails;
