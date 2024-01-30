import { FC } from "react";
import { useAppSelector } from "../../services/hooks";
// Components
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// Types
import { IIngredientProps } from "../../utils/types";
// Styles
import styles from "./images-feed.module.css";

interface IImagesFeed {
  data?: Array<string>;
}

const ImagesFeed: FC<IImagesFeed> = ({ data }) => {
  const { ingredients, loading } = useAppSelector((store) => store.ingredients);
  const testData = [
    "643d69a5c3f7b9001cfa093c",
    "643d69a5c3f7b9001cfa093e",
    "643d69a5c3f7b9001cfa0942",
    "643d69a5c3f7b9001cfa0949",
    "643d69a5c3f7b9001cfa0948",
    "643d69a5c3f7b9001cfa0947",
    "643d69a5c3f7b9001cfa0945",
    "643d69a5c3f7b9001cfa0946",
  ];
  const map = new Map();
  ingredients.forEach((obj: IIngredientProps) => {
    map.set(obj._id, obj);
  });
  const currentIngredients = testData.map((id) => map.get(id));
  const currentIngredientsImage = currentIngredients.map((el) => el?.image);
  const currentIngredientsPrice = currentIngredients
    .map((el) => el?.price)
    .reduce((acc, item) => (item ? acc + item : 0), 0);
  const additionalIngredientsQuantity =
    currentIngredients.length > 6 ? currentIngredients.length - 6 : null;

  return !loading ? (
    <div className={styles.wrapper}>
      <div className={styles.images_row}>
        {currentIngredientsImage.slice(0, 6).map((image, index) => (
          <div
            key={index}
            className={styles.image}
            style={{ zIndex: 6 - index, backgroundImage: `url(${image})` }}
          >
            {index === 5 && additionalIngredientsQuantity && (
              <div className={styles.substrate}>
                <span className={styles.quantity}>
                  +{additionalIngredientsQuantity}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles.price_wrapper}>
        <span className={styles.price}>{currentIngredientsPrice}</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  ) : null;
};

export default ImagesFeed;
