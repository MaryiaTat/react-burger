import { ChangeEvent } from "react";

export interface IngredientProps {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface ConstructorFillingTypes {
  id: string;
  elementId: string;
}

export interface Action {
  type: string;
  payload: any;
}

interface Form {
  type?: string;
  placeholder: string;
  value: string;
  icon?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
interface Button {
  title: string;
  type: string;
  htmlTypeSubmit?: boolean;
  onClick?: () => void;
}
interface Link {
  title: string;
  url: string;
}
interface Notifications {
  title: string;
  link: Link;
}

export interface FormStructure {
  title?: string;
  form: Array<Form>;
  buttons?: Array<Button>;
  notifications?: Array<Notifications>;
  showButtons: boolean;
  onsubmit: (e: React.SyntheticEvent) => void;
}
