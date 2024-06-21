/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useMemo } from "react";
import { convertNumberToVnd } from "@/utils/convert";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const currentDate = useMemo(() => new Date(), []);
  const previous2Day = useMemo(() => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1
    );
  }, [currentDate]);

  const {
    nameProduct,
    productCode,
    newPrice,
    thumbs,
    createdAt,
    discount,
    rate,
  } = product;

  return (
    <div
      className="relative w-full flex flex-col gap-4 py-3 px-3 rounded-lg border border-solid border-[#f1f1f1] overflow-hidden hover:cursor-pointer"
      onClick={() => navigate(`/detail/${productCode}`)}
    >
      <div className="overflow-hidden w-full aspect-square group">
        <img
          className="transition-all ease-in-out duration-300 group-hover:scale-110 w-full h-full object-cover"
          src={thumbs[4] || thumbs[0]}
          alt="CARD"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p
          className="uppercase text-[1.7rem] font-bold text-black w-full whitespace-nowrap text-ellipsis overflow-clip"
          title={nameProduct}
        >
          {nameProduct}
        </p>
        <div className="flex gap-1">
          {rate &&
            Array(rate)
              .fill(1)
              .map((item, index) => {
                return (
                  <span key={index}>
                    <FontAwesomeIcon className="text-yellow" icon={faStar} />
                  </span>
                );
              })}
        </div>
        <p className="text-textColor text-base font-bold">
          {convertNumberToVnd(newPrice)}
        </p>
        <div className="absolute top-0 left-0 flex flex-col gap-2">
          {previous2Day.getTime() <= createdAt &&
            createdAt <= currentDate.getTime() && (
              <div className="text-[1.3rem] bg-primary text-white py-2 px-6">
                New
              </div>
            )}
          {discount !== 0 && (
            <div className="text-[1.3rem] bg-red text-white py-2 px-6">
              {discount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
