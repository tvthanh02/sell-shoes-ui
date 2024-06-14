import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Input = () => {
  const [input, setInput] = useState("");

  return (
    <div className="basis-5/12 lg:basis-2/12">
      <div className="w-auto lg:w-[200px] h-[40px] flex items-center justify-end lg:justify-start rounded-[4rem] overflow-hidden">
        <input
          className="hidden lg:block w-full h-full outline-none text-sm text-textColor pl-[1.5rem] bg-[#f3f3f3]"
          type="text"
          placeholder="Nhập từ cần tìm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log(input);
              setInput("");
            }
          }}
        />
        <div className="w-[40px] h-full rounded-full lg:rounded-none flex items-center justify-center bg-[#f3f3f3] text-textColor">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
      </div>
    </div>
  );
};

export default Input;
