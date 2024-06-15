import { Slider } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import ProductCard from "@/components/ProductCard";

const Home = () => {
  const data = [
    "https://ananas.vn/wp-content/uploads/kv_basas_mobileBanner_4_2019.jpg",
    "https://bizweb.dktcdn.net/100/020/315/themes/756968/assets/banner_2.png?1645521760170",
  ];

  const newProducts = [
    {
      name: "NIKE AIR MAX EXCEE",
      thumb:
        "https://kingshoes.vn/data/upload/media/fz3593-133-giay-nike-air-max-excee-gia-tot-den-king-shoes-12.jpeg",
      price: "2.900.000 đ",
    },
    {
      name: "NIKE AIR MAX EXCEE",
      thumb:
        "https://kingshoes.vn/data/upload/media/fz3593-133-giay-nike-air-max-excee-gia-tot-den-king-shoes-12.jpeg",
      price: "2.900.000 đ",
    },
    {
      name: "NIKE AIR MAX 90 SE",
      thumb:
        "https://kingshoes.vn/data/upload/media/fb2269-106-giay-jordan-stadium-90-gia-tot-den-king-shoes-store-12.jpeg",
      price: "2.900.000 đ",
    },
    {
      name: "JORDAN STADIUM 90",
      thumb:
        "https://kingshoes.vn/data/upload/media/fz3593-133-giay-nike-air-max-excee-gia-tot-den-king-shoes-12.jpeg",
      price: "2.900.000 đ",
    },
    {
      name: "NIKE AIR MAX EXCEE",
      thumb:
        "https://kingshoes.vn/data/upload/media/dv1753-601-giay-nike-air-jordan-1-retro-high-og-university-red-black-gia-tot-den-king-shoes-13.jpeg",
      price: "2.900.000 đ",
    },
    {
      name: "JORDAN 1 RETRO HIGH OG UNIVERSITY RED BLACK",
      thumb:
        "https://kingshoes.vn/data/upload/media/ct3839-107-giay-nike-air-force-1-white-pink-gia-tot-den-king-shoes-18.jpeg",
      price: "5,800,000 đ",
    },
    {
      name: "NIKE AIR FORCE 1 WHITE PINK",
      thumb:
        "https://kingshoes.vn/data/upload/media/fq8127-030-giay-nike-terminator-low-phantom-and-black-gia-tot-den-king-shoes-12.jpeg",
      price: "3,600,000 đ",
    },
    {
      name: "NIKE TERMINATOR LOW PHANTOM",
      thumb:
        "https://kingshoes.vn/data/upload/media/fq8127-030-giay-nike-terminator-low-phantom-and-black-gia-tot-den-king-shoes-12.jpeg",
      price: "3,900,000 đ",
    },
    {
      name: "NIKE AIR WINFLO 10",
      thumb:
        "https://kingshoes.vn/data/upload/media/dd6203-003-giay-nike-air-wio-10-road-running-gia-tot-den-king-shoes-12.jpeg",
      price: "2.900.000 đ",
    },
    {
      name: "ADIDAS NMD_G1",
      thumb:
        "https://kingshoes.vn/data/upload/media/ie4559-giay-adidas-nmd-g1-chinh-hang-gia-tot-den-king-shoes-1.jpg",
      price: "2.900.000 đ",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
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
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-7">
          <article className="w-full flex flex-col gap-3 items-center">
            <div className="text-[5rem]">
              <FontAwesomeIcon icon={faTruckFast} />
            </div>
            <p className="text-primary uppercase text-2xl font-bold text-center">
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
            <p className="text-primary uppercase text-2xl font-bold text-center">
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
            <p className="text-primary uppercase text-2xl font-bold text-center">
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
      <section className="container flex flex-col gap-5 mt-15">
        <div className="w-full flex items-center justify-between">
          <div className="uppercase text-2xl font-bold">sản phẩm mới</div>
          <NavLink
            className={
              "flex items-center gap-2 text-sm bg-primary uppercase text-white font-bold py-3 px-4 rounded-full"
            }
            to={"/product"}
          >
            xem thêm
            <FontAwesomeIcon icon={faArrowRight} />
          </NavLink>
        </div>
        <div className="w-full">
          <Slider
            settings={{
              dots: false,
              infinite: false,
              speed: 500,
              slidesToShow: 4,
              swipeToSlide: true,
              slidesToScroll: 1,
              nextArrow: <></>,
              prevArrow: <></>,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ],
            }}
          >
            {newProducts.map((product, index) => {
              return (
                <div key={index} className="w-[260px] md:px-3">
                  <ProductCard product={product} />
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
      <section className="container flex flex-col gap-5 mt-15">
        <div className="w-full flex items-center justify-between">
          <div className="uppercase text-2xl font-bold">sản phẩm nổi bật</div>
          <NavLink
            className={
              "flex items-center gap-2 text-sm bg-primary uppercase text-white font-bold py-3 px-4 rounded-full"
            }
            to={"/product?q=bestsell"}
          >
            xem thêm
            <FontAwesomeIcon icon={faArrowRight} />
          </NavLink>
        </div>
        <div className="w-full">
          <Slider
            settings={{
              dots: false,
              infinite: false,
              speed: 500,
              slidesToShow: 4,
              swipeToSlide: true,
              slidesToScroll: 1,
              nextArrow: <></>,
              prevArrow: <></>,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ],
            }}
          >
            {newProducts.map((product, index) => {
              return (
                <div key={index} className="w-[260px] md:px-3">
                  <ProductCard product={product} />
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
      <section className="container flex flex-col gap-5 mt-15">
        <div className="w-full flex items-center justify-between">
          <div className="uppercase text-2xl font-bold">
            sản phẩm khuyến mãi
          </div>
          <NavLink
            className={
              "flex items-center gap-2 text-sm lg:bg-primary uppercase text-black lg:text-white font-bold lg:py-3 lg:px-4 rounded-full"
            }
            to={"/product?q=promotion"}
          >
            xem thêm
            <FontAwesomeIcon icon={faArrowRight} />
          </NavLink>
        </div>
        <div className="w-full">
          <Slider
            settings={{
              dots: false,
              infinite: false,
              speed: 500,
              slidesToShow: 4,
              swipeToSlide: true,
              slidesToScroll: 1,
              nextArrow: <></>,
              prevArrow: <></>,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ],
            }}
          >
            {newProducts.map((product, index) => {
              return (
                <div key={index} className="w-[260px] md:px-3">
                  <ProductCard product={product} />
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default Home;
