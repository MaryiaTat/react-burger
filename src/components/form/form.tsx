import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
// Components
import {
  Input,
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FormStructure } from "../../utils/types";
import { FormConstants } from "../../utils/constants";
// Styles
import styles from "./form.module.css";

interface FormProps {
  structure: FormStructure;
  styles?: string;
}

const Form: FC<FormProps> = ({ structure }) => {
  const location = useLocation();
  const { title, form, buttons, notifications, showButtons, onsubmit } = structure;
  return (
    <section className={styles.section}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <form onSubmit={onsubmit} className={styles.form}>
        {form.map((item, index) => {
          switch (item.type) {
            case FormConstants.TEXT:
              return (
                <Input
                  key={`${index}_${item.placeholder}`}
                  type="text"
                  placeholder={item.placeholder}
                  value={item.value}
                  onChange={item.onChange}
                  icon={item.icon ? "EditIcon" : undefined}
                />
              );
            case FormConstants.PASSWORD:
              return (
                <PasswordInput
                  key={`${index}_${item.placeholder}`}
                  placeholder={item.placeholder}
                  value={item.value}
                  onChange={item.onChange}
                  name={"password"}
                  icon={item.icon ? "EditIcon" : undefined}
                />
              );
            case FormConstants.EMAIL:
              return (
                <EmailInput
                  key={`${index}_${item.placeholder}`}
                  placeholder={item.placeholder}
                  value={item.value}
                  onChange={item.onChange}
                  isIcon={item.icon}
                />
              );
            default:
              return (
                <Input
                  key={`${index}_${item.placeholder}`}
                  type="text"
                  placeholder={item.placeholder}
                  value={item.value}
                  onChange={item.onChange}
                  icon={item.icon ? "EditIcon" : undefined}
                />
              );
          }
        })}
        {buttons && showButtons && (
          <div className={buttons.length > 1 ? styles.buttons : styles.button}>
            {buttons.map((button, index) =>
              button.type === "primary" ? (
                <Button
                  key={index}
                  type="primary"
                  htmlType={button.htmlTypeSubmit ? "submit" : "button"}
                  onClick={button?.onClick || undefined}
                >
                  {button.title}
                </Button>
              ) : (
                <Button
                  key={index}
                  type="secondary"
                  htmlType={button.htmlTypeSubmit ? "submit" : "button"}
                  onClick={button?.onClick || undefined}
                >
                  {button.title}
                </Button>
              ),
            )}
          </div>
        )}
      </form>
      {notifications && (
        <div className={styles.noteBlock}>
          {notifications.map((el, index) => (
            <div className={styles.note} key={`note_${index}`}>
              <span className={styles.noteTitle}>{el.title}</span>
              <Link
                className={styles.noteLink}
                to={el.link.url}
                state={{ from: location.state?.from }}
              >
                {el.link.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Form;
