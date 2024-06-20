/* eslint-disable react/prop-types */
import {
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ itemsPerPage, totalPages, limitData, onChangePage }) => {
  const pageCount = Math.ceil(totalPages / itemsPerPage);

  useEffect(() => {
    onChangePage(limitData.slice(0, itemsPerPage));
  }, [limitData]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    window.scrollTo(0, 150, { behavior: "smooth" });

    onChangePage(limitData.slice(newOffset, newOffset + itemsPerPage));
  };

  return (
    <ReactPaginate
      className="py-2 px-4 flex items-center justify-center gap-5 md:gap-8"
      activeClassName="bg-red text-white border-none"
      breakLabel="..."
      nextLabel={
        <FontAwesomeIcon
          className="text-xl text-textColor p-2"
          icon={faAngleRight}
        />
      }
      pageClassName="py-2 px-4 border border-solid border-textColor rounded-lg"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel={
        <FontAwesomeIcon
          className="text-xl text-textColor p-2"
          icon={faAngleLeft}
        />
      }
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
