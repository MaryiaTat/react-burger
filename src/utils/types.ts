import { ChangeEvent } from "react";

export interface IIngredientProps {
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

export interface IAction {
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

export interface IUserInfo {
  name: string;
  email: string;
}

export interface IUserAllInfo extends IUserInfo {
  password: string;
}

export interface ILoginUserInfo {
  email: string;
  password: string;
}

interface IOrderInfo {
  ingredients: Array<IIngredientProps>;
  _id: string;
  owner: {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
}

export interface IAllOrderInfo {
  success: boolean;
  name: string;
  order: IOrderInfo;
}

export interface ILogin {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUserInfo;
}

export interface IUpdate extends Omit<ILogin, "accessToken" | "refreshToken"> {}

export interface IForgotPassword {
  success: boolean;
  message: string;
}

export interface IIngredients {
  success: boolean;
  data: Array<IIngredientProps>;
}
