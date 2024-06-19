/* eslint-disable react/prop-types */
import { useId } from "react";

const CheckBox = ({ title, value, onChange }) => {
  const id = useId();
  return (
    <div className="flex items-center gap-5 text-base text-black">
      <input
        className="hover:cursor-pointer"
        id={id}
        type="checkbox"
        value={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{title}</label>
    </div>
  );
};

export default CheckBox;
