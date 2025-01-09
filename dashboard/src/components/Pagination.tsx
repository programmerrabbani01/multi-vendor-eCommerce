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

  const createBtn = () => {
    const startPage = Math.max(1, pageNumber - Math.floor(showItem / 2));
    const endPage = Math.min(totalPages, startPage + showItem - 1);

    const btns = [];
    for (let i = startPage; i <= endPage; i++) {
      btns.push(
        <li
          key={i}
          onClick={() => setPageNumber(i)}
          className={`${
            pageNumber === i
              ? "bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white"
              : "bg-slate-700 hover:bg-indigo-500 shadow-lg shadow-indigo-500/50 text-[#d0d2d6] hover:text-white"
          } w-[33px] h-[33px] flex justify-center items-center rounded-full cursor-pointer`}
        >
          {i}
        </li>
      );
    }

    return btns;
  };

  return (
    <ul className="flex gap-3">
      {/* Left Arrow */}
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber(1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-700 text-[#d0d2d6] cursor-pointer"
        >
          <BsChevronDoubleLeft size={20} />
        </li>
      )}

      {createBtn()}

      {/* Right Arrow */}
      {pageNumber < totalPages && (
        <li
          onClick={() => setPageNumber(pageNumber + 1)}
          className="w-[33px] h-[33px] rounded-full flex justify-center items-center bg-slate-700 text-[#d0d2d6] cursor-pointer"
        >
          <BsChevronDoubleRight size={20} />
        </li>
      )}
    </ul>
  );
}
