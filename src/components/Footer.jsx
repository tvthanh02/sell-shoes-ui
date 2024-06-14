import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="mt-[200px]">
      <div className="w-full bg-[#333] text-white">
        <div className="container py-[4rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="w-full flex items-center gap-4">
            <FontAwesomeIcon className="text-[2rem]" icon={faEnvelope} />
            <p className="uppercase text-[2rem] font-normal">
              Đăng ký nhận code
            </p>
          </div>
          <div className="w-full flex items-center">
            <div className="w-full flex items-center bg-textColor rounded-full p-1 overflow-hidden">
              <input
                className="flex-1 h-[40px] px-3 bg-textColor outline-none border-none"
                type="text"
                placeholder="Địa chỉ email của bạn"
              />
              <button className="transition-all ease-linear duration-300 h-[40px] py-1 px-6 bg-primary rounded-full text-black font-medium hover:text-primary hover:bg-[#333] uppercase">
                Đăng ký
              </button>
            </div>
          </div>
          <div className="w-full flex items-center md:justify-start lg:justify-end text-sm">
            <div className="flex items-baseline">
              ...Nhận ngay
              <p className="text-[2.4rem] text-primary mx-1">VOUCHER 100k</p>
              từ chúng tôi.
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-black text-white">
        <div className="container grid py-[40px] grid-cols-1 md:grid-cols-4 gap-8 md:gap-5">
          <div className="row-start-4 md:row-start-1 w-full flex-grow-0 flex-shrink-0">
            <p className="flex items-center gap-1 text-xl md:text-2xl lg:basis-3/12 lg:text-3xl font-bold">
              <span className="py-[2px] px-1 bg-primary text-black rounded-full">
                TVT
              </span>
              Shop
            </p>
            <span className="text-[1.1rem] lg:text-[1.3rem] text-white">
              You&apos;re king in your way
            </span>
          </div>
          <div className="w-full flex flex-col justify-start gap-4 flex-grow-0 flex-shrink-0">
            <p className="uppercase font-bold text-base">Hỗ trợ khách hàng</p>
            <div className="flex flex-col gap-3 text-sm">
              <NavLink
                className={
                  "transition-all ease-out duration-200 hover:text-primary hover:translate-x-2"
                }
                to={"/"}
              >
                Chăm sóc khách hàng
              </NavLink>
              <NavLink
                className={
                  "transition-all ease-out duration-200 hover:text-primary hover:translate-x-2"
                }
                to={"/"}
              >
                Thanh toán
              </NavLink>
              <NavLink
                className={
                  "transition-all ease-out duration-200 hover:text-primary hover:translate-x-2"
                }
                to={"/"}
              >
                Hướng dẫn mua hàng
              </NavLink>
            </div>
          </div>
          <div className="w-full flex flex-col justify-start gap-4 flex-grow-0 flex-shrink-0">
            <p className="uppercase font-bold text-base">chính sách</p>
            <div className="flex flex-col gap-3 text-sm">
              <NavLink
                className={
                  "transition-all ease-out duration-200 hover:text-primary hover:translate-x-2"
                }
                to={"/"}
              >
                Chế độ bảo hành
              </NavLink>
              <NavLink
                className={
                  "transition-all ease-out duration-200 hover:text-primary hover:translate-x-2"
                }
                to={"/"}
              >
                Chính sách đổi trả
              </NavLink>
              <NavLink
                className={
                  "transition-all ease-out duration-200 hover:text-primary hover:translate-x-2"
                }
                to={"/"}
              >
                Bảo mật thông tin
              </NavLink>
              <NavLink
                className={
                  "transition-all ease-out duration-200 hover:text-primary hover:translate-x-2"
                }
                to={"/"}
              >
                Chính sách giao nhận
              </NavLink>
            </div>
          </div>
          <div className="w-full flex flex-col justify-start gap-4 flex-grow-0 flex-shrink-0">
            <p className="uppercase font-bold text-base">Thông tin liên hệ</p>
            <div className="flex flex-col gap-3 text-sm">
              <p>TVTSHOP.VN Trang Thông Tin Chính Thức</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
