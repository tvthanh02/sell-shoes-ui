import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faCartShopping,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

import Input from "@/components/Input";

const Header = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <header className="fixed top-0 left-0 right-0 shadow-sm bg-white">
      <div
        className={
          "container flex items-center text-textColor justify-end gap-2 py-2"
        }
      >
        <FontAwesomeIcon icon={faPhone} />
        <span>Hotline: </span>
        <p className="font-bold">0356457894</p>
      </div>
      <hr className="w-full h-[1px] border-t border-solid border-[#f1f1f1]" />
      <div className="container bg-white flex items-center text-[1.5rem] py-2 gap-3">
        <div className="basis-5/12 lg:basis-2/12">
          <p className="text-xl md:text-2xl lg:basis-3/12 lg:text-3xl font-bold">
            <span className="py-[2px] px-1 bg-primary rounded-full">TVT</span>
            Shop
          </p>
          <span className="text-[1.1rem] lg:text-[1.3rem] text-textColor">
            You&apos;re king in your way
          </span>
        </div>
        <nav className="hidden lg:flex lg:flex-row lg:basis-7/12 items-center justify-center gap-10 font-bold uppercase">
          <NavLink
            className={
              "p-[1rem] hover:bg-primary hover:text-white rounded-[20px] transition-all ease-in-out duration-300"
            }
            to={"/"}
          >
            giới thiệu
          </NavLink>
          <NavLink
            className={
              "p-[1rem] hover:bg-primary hover:text-white rounded-[20px] transition-all ease-in-out duration-300"
            }
            to={"/product"}
          >
            sản phẩm
          </NavLink>
          <NavLink
            className={
              "p-[1rem] hover:bg-primary hover:text-white rounded-[20px] transition-all ease-in-out duration-300"
            }
            to={"/services"}
          >
            dịch vụ
          </NavLink>
          <NavLink
            className={
              "p-[1rem] hover:bg-primary hover:text-white rounded-[20px] transition-all ease-in-out duration-300"
            }
            to={"/contact"}
          >
            liên hệ
          </NavLink>
        </nav>
        <Input />
        <div className="basis-1/12 lg:basis-1/12 flex justify-end">
          <NavLink
            className={
              "relative w-[40px] h-[40px] bg-black rounded-full text-white flex items-center justify-center"
            }
            to={"/cart"}
          >
            <FontAwesomeIcon icon={faCartShopping} />
            <div className="absolute top-0 right-0 translate-x-[30%] translate-y-[-30%] w-[20px] h-[20px] flex items-center justify-center rounded-full bg-primary text-black">
              {quantity}
            </div>
          </NavLink>
        </div>
        <div className="basis-1/12 lg:hidden lg:basis-0 flex justify-end">
          <div className="w-[40px] h-[40px] lg:hidden bg-primary rounded-full flex items-center justify-center text-white">
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
