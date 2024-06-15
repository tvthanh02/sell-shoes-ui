import { Slider } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Home = () => {
  const data = [
    "https://ananas.vn/wp-content/uploads/kv_basas_mobileBanner_4_2019.jpg",
    "https://bizweb.dktcdn.net/100/020/315/themes/756968/assets/banner_2.png?1645521760170",
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 10000,
    nextArrow: <></>,
    prevArrow: <></>,
  };

  return (
    <div className="w-full">
      <section className="container w-full overflow-hidden">
        <div className="w-full h-[600px] rounded-3xl overflow-hidden">
          <Slider settings={settings}>
            {data.map((item, index) => {
              return (
                <div key={index} className="w-full h-full">
                  <img
                    className="w-full h-full object-cover"
                    src={item}
                    alt="Banner"
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
      <section className="bg-[#f0f0f0] py-[5rem]">
        <div className="container grid grid-cols-3 gap-7">
          <article className="w-full flex flex-col gap-3 items-center">
            <div className="text-[5rem]">
              <FontAwesomeIcon icon={faTruckFast} />
            </div>
            <p className="text-primary uppercase text-2xl font-bold">
              cam kết chính hãng
            </p>
            <span className="text-sm font-bold leading-7">100% Authentic</span>
            <p className="w-full whitespace-nowrap text-ellipsis overflow-clip text-sm text-textColor text-center">
              Cam kết sản phẩm chính hãng từ Châu Âu, Châu Mỹ, Cam kết sản phẩm
              chính hãng từ Châu Âu, Châu Mỹ...
            </p>
          </article>
          <article className="w-full flex flex-col gap-3 items-center">
            <div className="text-[5rem]">
              <FontAwesomeIcon icon={faTruckFast} />
            </div>
            <p className="text-primary uppercase text-2xl font-bold">
              GIAO HÀNG HỎA TỐC
            </p>
            <span className="text-sm font-bold leading-7">
              Express delivery
            </span>
            <p className="w-full whitespace-nowrap text-ellipsis overflow-clip text-sm text-textColor text-center">
              SHIP hỏa tốc 1h nhận hàng trong nội thành HCM
            </p>
          </article>
          <article className="w-full flex flex-col gap-3 items-center">
            <div className="text-[5rem]">
              <FontAwesomeIcon icon={faTruckFast} />
            </div>
            <p className="text-primary uppercase text-2xl font-bold">
              HỖ TRỢ 24/24
            </p>
            <span className="text-sm font-bold leading-7">
              Supporting 24/24
            </span>
            <p className="w-full whitespace-nowrap text-ellipsis overflow-clip text-sm text-textColor text-center">
              Gọi ngay 0909300746
            </p>
          </article>
        </div>
      </section>
      <section className="container flex flex-col gap-5 my-13">
        <div className="w-full flex items-center justify-between">
          <div className="uppercase text-2xl font-bold">sản phẩm mới</div>
          <NavLink
            className={
              "flex items-center gap-2 text-sm bg-primary uppercase text-white font-bold py-3 px-4 rounded-full"
            }
            to={"/product/filter=1"}
          >
            xem thêm
            <FontAwesomeIcon icon={faArrowRight} />
          </NavLink>
        </div>
        <div className="w-full "></div>
      </section>
    </div>
  );
};

export default Home;
