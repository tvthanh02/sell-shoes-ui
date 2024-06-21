import Breadcrumb from "@/components/Breadcrumb";
import { useEffect, useState, useMemo, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { clearCart, getCartFromStorage } from "@/utils/storage";
import { convertNumberToVnd } from "@/utils/convert";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addBill } from "@/service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppContext } from "@/App";

function Payment() {
  const [address, setAddress] = useState({
    province: "",
    district: "",
    village: "",
  });

  const navigate = useNavigate();

  const [crumbs, setCrumbs] = useState([]);
  const [cart, setCart] = useState([]);
  const { dispatcher } = useContext(AppContext);

  useEffect(() => {
    const cart = getCartFromStorage();

    setCart(cart);
    setCrumbs([
      {
        label: "Trang Chủ",
        path: "/",
        icon: <FontAwesomeIcon icon={faHome} />,
      },
      { label: "Giỏ Hàng", path: "/cart" },
      { label: "Thanh Toán" },
    ]);
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      road: "",
      note: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Cần phải điền chính xác họ")
        .required("Bạn cần phải nhập họ"),
      lastName: Yup.string()
        .min(2, "Cần phải điền chính xác tên")
        .required("Bạn cần phải nhập tên"),
      email: Yup.string()
        .email("Phải là email vd:yourname@gmail.com")
        .required("Bạn cần phải nhập email"),
      phoneNumber: Yup.string()
        .required("Bạn cần phải nhập số điện thoại")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          "Phải là số điện thoại vd:0324xxxxx"
        )
        .min(10, "Quá ngắn so với số điện thoại")
        .max(10, "Quá dài so với số điện thoại"),
      road: Yup.string().required("Bạn cần phải nhập địa chỉ cụ thể"),
      note: Yup.string(),
    }),
    onSubmit: async (values) => {
      if (values) {
        if (!address.district || !address.province || !address.village) {
          return;
        }
        const isAddSuccess = await addBill({
          ...values,
          ...address,
          cart: cart,
        });
        if (isAddSuccess) {
          Swal.fire({
            icon: "success",
            title: "Bạn đã đặt hàng thành công!",
            text: "Tiếp tục mua sắm nhé :>",
          }).then((result) => {
            if (result.isConfirmed) {
              clearCart();
              dispatcher({ type: "UPDATE_QUANTITY", payload: 0 });
              navigate("/product");
            }
          });
        }
      }
    },
  });

  const sumQuantityAndPrice = useMemo(() => {
    return Array.from(cart).reduce(
      (obj, currentProduct) => {
        return {
          totalQuantity: obj.totalQuantity + currentProduct.quantity,
          totalPrice:
            obj.totalPrice + currentProduct.quantity * currentProduct.price,
        };
      },
      {
        totalQuantity: 0,
        totalPrice: 0,
      }
    );
  }, [cart]);

  return (
    <div className="container">
      <div className="my-8">
        {crumbs.length > 0 && <Breadcrumb crumbs={crumbs} />}
      </div>
      <div className="w-full grid  md:grid-cols-1 lg:grid-cols-1.5/1 gap-[6rem]">
        <form>
          <div className="row-span-2 lg:row-span-1 flex flex-col gap-6">
            <div className="text-2xl font-bold">Thông Tin Người Mua</div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="username">
                  Họ và Tên <span className="text-red">*</span>
                </label>
                <div id="username" className="grid grid-cols-2 gap-4">
                  <div className="w-full flex flex-col">
                    <input
                      className="w-full h-[4rem] border outline-none pl-3"
                      type="text"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      placeholder="Họ"
                    />

                    {formik.errors.firstName && formik.touched.firstName && (
                      <span className="text-red text-[1.3rem]">
                        {formik.errors.firstName}
                      </span>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <input
                      className="w-full h-[4rem] border outline-none pl-3"
                      type="text"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      placeholder="Tên"
                    />
                    {formik.errors.lastName && formik.touched.lastName && (
                      <span className="text-red text-[1.3rem]">
                        {formik.errors.lastName}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="email">
                  Email <span className="text-red">*</span>
                </label>
                <div id="email" className="">
                  <div className="w-full flex flex-col">
                    <input
                      className="w-full h-[4rem] border outline-none pl-3"
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      placeholder="Email"
                    />
                    {formik.errors.email && formik.touched.email && (
                      <span className="text-red text-[1.3rem]">
                        {formik.errors.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold" htmlFor="phone">
                  Số Điện Thoại <span className="text-red">*</span>
                </label>
                <div id="phone" className="">
                  <div className="w-full flex flex-col">
                    <input
                      className="w-full h-[4rem] border outline-none pl-3"
                      type="text"
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      placeholder="Số Điện Thoại"
                    />
                    {formik.errors.phoneNumber &&
                      formik.touched.phoneNumber && (
                        <span className="text-red text-[1.3rem]">
                          {formik.errors.phoneNumber}
                        </span>
                      )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-base">
                <label className="text-base font-semibold" htmlFor="address">
                  Địa Chỉ <span className="text-red">*</span>
                </label>
                <div
                  id="address"
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="w-full">
                    <select
                      className="w-full h-[4rem] border outline-none pl-3"
                      name="province"
                      onChange={(e) =>
                        setAddress((prev) => ({
                          ...prev,
                          province: e.target.value,
                        }))
                      }
                    >
                      <option value="">--Tỉnh/Thành phố--</option>
                      <option value="Hà Nội">Hà Nội</option>
                    </select>
                    {!address.province && (
                      <span className="text-red text-[1.3rem]">
                        Bạn cần phải chọn Tỉnh/Thành phố
                      </span>
                    )}
                  </div>
                  <div className="w-full">
                    <select
                      className="w-full h-[4rem] border outline-none pl-3"
                      name="district"
                      onChange={(e) =>
                        setAddress((prev) => ({
                          ...prev,
                          district: e.target.value,
                        }))
                      }
                    >
                      <option value="">--Quận/Huyện--</option>

                      <option value="Hoàng Mai">Hoàng Mai</option>
                    </select>
                    {!address.district && (
                      <span className="text-red text-[1.3rem]">
                        Bạn cần phải chọn Quận/Huyện
                      </span>
                    )}
                  </div>
                  <div className="w-full">
                    <select
                      className="w-full h-[4rem] border outline-none pl-3"
                      name="village"
                      onChange={(e) =>
                        setAddress((prev) => ({
                          ...prev,
                          village: e.target.value,
                        }))
                      }
                    >
                      <option value="">--Xã/Thị trấn--</option>

                      <option value="Khương Đình">Tương Mai</option>
                    </select>
                    {!address.village && (
                      <span className="text-red text-[1.3rem]">
                        Bạn cần phải chọn Xã/Thị trấn
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="font-semibold" htmlFor="line">
                  Địa chỉ cụ thể
                  <span className="text-red text-[1.3rem]">*</span>
                </label>
                <div id="line" className="">
                  <div className="w-full flex flex-col">
                    <input
                      className="w-full h-[4rem] border outline-none pl-3"
                      type="text"
                      name="road"
                      value={formik.values.road}
                      onChange={formik.handleChange}
                      placeholder="Số nhà"
                    />
                    {formik.errors.road && formik.touched.road && (
                      <span className="text-red text-[1.3rem]">
                        {formik.errors.road}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="font-semibold" htmlFor="note">
                  Lời nhắn
                </label>
                <div id="note" className="">
                  <div className="w-full flex flex-col">
                    <textarea
                      className="resize-none w-full h-[10rem] border outline-none pl-3 pt-3"
                      type="text"
                      name="note"
                      value={formik.values.note}
                      onChange={formik.handleChange}
                      placeholder="Lời nhắn"
                    />
                    {formik.errors.note && formik.touched.note && (
                      <span className="text-red text-[1.3rem]">
                        {formik.errors.note}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end gap-5">
                <button
                  type="reset"
                  className="min-w-[8rem] py-2 px-8 bg-red text-white rounded-lg shadow-lg font-semibold"
                  onClick={() => {
                    formik.resetForm();
                    navigate("/cart");
                  }}
                >
                  Hủy
                </button>
                <button
                  className="min-w-[8rem] py-2 px-8 bg-primary text-black rounded-lg shadow-lg font-semibold"
                  type="submit"
                  onClick={formik.handleSubmit}
                >
                  Xác Nhận
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="row-start-1 lg:row-span-2 flex flex-col gap-10">
          <div className="text-2xl font-bold">Thông Tin Thanh Toán</div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2/1x2">
              <p className="font-bold">Tên Sản Phẩm</p>
              <p className="font-bold flex justify-end">Số Lượng</p>
              <p className="font-bold flex justify-end">Giá Mua</p>
            </div>
            <hr className="border-t border-solid border-gray" />
            {cart.length > 0 &&
              cart.map((product) => {
                return (
                  <div
                    key={[product.code, product.size].join()}
                    className="grid grid-cols-2/1x2 gap-2"
                  >
                    <p className="py-1 font-normal">{product.productName}</p>
                    <p className="py-1 flex justify-end">
                      x {product.quantity}
                    </p>
                    <p className="py-1 text-red font-bold flex justify-end">
                      {convertNumberToVnd(product.quantity * product.price)}
                    </p>
                  </div>
                );
              })}
            <hr className="border-t border-solid border-gray" />
            <div className="flex items-center justify-between">
              <p className="font-bold">Mã giảm giá</p>
              <p className="text-red font-bold">Không</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold">Phí Vận chuyển</p>
              <p className="text-red font-bold">Miễn phí</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold">Thành Tiền</p>
              <p className="text-red font-bold">
                {convertNumberToVnd(sumQuantityAndPrice.totalPrice)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
