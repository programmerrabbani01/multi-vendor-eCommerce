import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { PaginationProps } from "../types.ts";

export default function Pagination({
  pageNumber,
  setPageNumber,
  totalItem,
  parPage,
  showItem,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItem / parPage);

  let startPage = pageNumber;

  const difference = totalPages - startPage;

  if (difference <= showItem) {
    startPage = totalPages - showItem;
  }

  const endPage = startPage < 0 ? showItem : showItem + startPage;

  if (startPage <= 0) {
    startPage = 1;
  }

  const createBtn = () => {
    const btns = [];

    for (let i = startPage; i < endPage; i++) {
      btns.push(
        <li
          onClick={() => setPageNumber(i)}
          className={`${
            pageNumber === i
              ? "bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white "
              : "bg-slate-700 hover:bg-indigo-500 shadow-lg shadow-indigo-500/50 text-[#d0d2d6] hover:text-white "
          } w-[33px] h-[33px] flex justify-center items-center rounded-full cursor-pointer `}
        >
          {i}
        </li>
      );
    }

    return btns;
  };

  return (
    <>
      <ul className="flex gap-3">
        {pageNumber > 1 && (
          <li
            onClick={() => setPageNumber(startPage - 1)}
            className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-700 text-[#d0d2d6] cursor-pointer "
          >
            <BsChevronDoubleLeft size={20} />
          </li>
        )}
        {createBtn()}{" "}
        {pageNumber < totalPages && (
          <li
            onClick={() => setPageNumber(startPage + 1)}
            className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-700 text-[#d0d2d6] cursor-pointer "
          >
            <BsChevronDoubleRight size={20} />
          </li>
        )}
      </ul>
    </>
  );
}
