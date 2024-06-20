/* eslint-disable react/prop-types */
import { CheckBox } from ".";

const FilterGroup = ({ label, query, onChange, data }) => {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-semibold">{label}</p>
      <div className="flex flex-row flex-wrap md:flex-col gap-2">
        {data?.map((value, index) => {
          return (
            <CheckBox
              key={index}
              title={value}
              value={value}
              onChange={(e) => onChange(e, query)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FilterGroup;
