import CheckBox from "./CheckBox";
import style from "../styles/Grid.module.css";
import { Fragment } from "react";

export default function Answers({ options = [], handleChange, input }) {
  return (
    <div key={Math.random()} className={`${style.grid} pb-7`}>
      {options?.map((option, index) => (
        <Fragment key={index}>
          {input ? (
            <div className="bg-slate-200 dark:bg-slate-700 p-3 mt-5">
              <CheckBox
                key={Math.random()}
                type="checkbox"
                onChange={(e) => handleChange(e, index)}
                text={option.title}
                value={index}
                checked={option.checked}
              />
            </div>
          ) : (
            <div
              className={`p-3 mt-2 ${
                option.correct
                  ? "bg-green-400"
                  : option.checked
                  ? "bg-red-500"
                  : "bg-slate-200 dark:bg-slate-700 "
              }`}
            >
              <CheckBox
                key={Math.random()}
                type="checkbox"
                text={option.title}
                defaultChecked={option.checked}
                disabled
              />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
