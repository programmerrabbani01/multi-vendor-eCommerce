import { useDispatch, useSelector } from "react-redux";
import {
  getAuthData,
  setMessageEmpty,
} from "../../../features/auth/authSlice.ts";
import { useEffect } from "react";
import { createToaster } from "../../../utils/tostify.ts";
import { AppDispatch } from "../../../app/store.ts";
import MetaData from "../../../components/MetaData.tsx";
import useAuthUser from "../../../hooks/useAuthUser.tsx";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import { IoCartOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { RiProductHuntLine } from "react-icons/ri";
import { CgDollar } from "react-icons/cg";

export default function SellerDashboard() {
  const title = "Seller Dashboard";
  const { user } = useAuthUser();
  const { message } = useSelector(getAuthData);

  const dispatch = useDispatch<AppDispatch>();

  // chart data

  const state = {
    series: [
      {
        name: "Orders",
        data: [34, 65, 34, 65, 34, 34, 34, 56, 23, 67, 23, 45],
      },
      {
        name: "Revenue",
        data: [34, 32, 45, 32, 34, 34, 43, 56, 65, 67, 43, 78],
      },
      {
        name: "Sellers",
        data: [78, 32, 34, 54, 65, 34, 54, 21, 54, 43, 45, 43],
      },
    ],
    options: {
      colors: ["#00E396", "#FEB019", "#775DD0"],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: "60%", // Adjust column width
        },
      },
      chart: {
        type: "bar",
        background: "transparent",
        foreColor: "#d0d2d6",
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: "smooth",
        color: "#f0f0f0",
        width: 5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top", // Corrected position value
        horizontalAlign: "center",
      },
      responsive: [
        {
          breakpoint: 600,
          yaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          options: {
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              },
            },
            chart: {
              height: 300,
            },
          },
        },
      ],
    },
  };

  // for success or errror message
  useEffect(() => {
    if (message) {
      createToaster(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [dispatch, message]);
  return (
    <>
      {user?.role?.name === "Seller" && (
        <>
          <MetaData title={title} />
          {/* start */}
          <div className="px-2 py-5 md:px-7">
            {/* top cards */}
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
              {/* item */}
              <div className="flex items-center justify-between p-5 bg-[#283046] rounded-md gap-3 ">
                <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
                  <h2 className="text-3xl font-primarySemiBold ">$ 1350</h2>
                  <h4 className="text-base font-primaryRegular">Total Sales</h4>
                </div>
                <div className="w-[46px] h-[47px] bg-[#28c76f1f] rounded-full flex justify-center items-center animate-pulse">
                  <CgDollar size={23} className="text-[#28c76f] shadow-lg" />
                </div>
              </div>
              {/* item */}
              <div className="flex items-center justify-between p-5 bg-[#283046] rounded-md gap-3 ">
                <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
                  <h2 className="text-3xl font-primarySemiBold ">16</h2>
                  <h4 className="text-base font-primaryRegular">Products</h4>
                </div>
                <div className="w-[46px] h-[47px] bg-[#e000e81f] rounded-full flex justify-center items-center animate-pulse">
                  <RiProductHuntLine
                    size={23}
                    className="text-[#cd00e8] shadow-lg"
                  />
                </div>
              </div>
              {/* item */}
              <div className="flex items-center justify-between p-5 bg-[#283046] rounded-md gap-3 ">
                <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
                  <h2 className="text-3xl font-primarySemiBold ">3</h2>
                  <h4 className="text-base font-primaryRegular">Sellers</h4>
                </div>
                <div className="w-[46px] h-[47px] bg-[#00cfe81f] rounded-full flex justify-center items-center animate-pulse">
                  <FaUsers size={23} className="text-[#00cfe8] shadow-lg" />
                </div>
              </div>
              {/* item */}
              <div className="flex items-center justify-between p-5 bg-[#283046] rounded-md gap-3 ">
                <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
                  <h2 className="text-3xl font-primarySemiBold ">6</h2>
                  <h4 className="text-base font-primaryRegular">Orders</h4>
                </div>
                <div className="w-[46px] h-[47px] bg-[#7367f01f] rounded-full flex justify-center items-center animate-pulse">
                  <IoCartOutline
                    size={23}
                    className="text-[#7367f0] shadow-lg"
                  />
                </div>
              </div>
            </div>
            {/* chart & seller Message */}
            <div className="flex flex-wrap w-full mt-7">
              {/* chart */}
              <div className="w-full lg:w-7/12 lg:pr-3">
                <div className="w-full bg-[#283046] p-4 rounded-md">
                  <Chart
                    options={state.options}
                    series={state.series}
                    type="bar"
                    height={350}
                  />
                </div>
              </div>
              {/* message */}
              <div className="w-full mt-6 lg:w-5/12 lg:pl-2 lg:mt-0">
                <div className="w-full bg-[#283046] p-4 rounded-md text-[#d0d2d6] h-[398px] overflow-hidden">
                  {/* top message */}
                  <div className="flex items-center justify-between pb-6 ">
                    <h2 className="text-base font-primarySemiBold">
                      Recent Seller Messages
                    </h2>
                    <Link
                      to=""
                      className="text-sm transition-all duration-300 font-primaryRegular hover:underline hover:text-indigo-600"
                    >
                      View All
                    </Link>
                  </div>
                  {/* message list */}
                  <div className="flex flex-col gap-2  overflow-y-auto sidebar h-[398px]">
                    <ol className="relative pb-20 ml-4 border-1 border-slate-600">
                      <li className="mb-3 ml-7">
                        <div className="flex justify-center items-center absolute -left-4 shadow-lg w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full ">
                          <img
                            src="/images/admin.png"
                            alt="admin-photo"
                            className="w-full h-full rounded-full shadow-lg "
                          />
                        </div>
                        <div className="p-3 border rounded-lg shadow-sm bg-slate-800 border-slate-600">
                          <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-primarySemiBold">
                              Admin
                            </h2>
                            <time className="mb-1 text-sm font-primaryMedium sm:order-last sm:mb-0">
                              4 Days Ago
                            </time>
                          </div>
                          <div className="p-2 text-sm border rounded-lg bg-slate-700 border-slate-800 font-primaryMediumItalic">
                            How are you?
                          </div>
                        </div>
                      </li>

                      <li className="mb-3 ml-7">
                        <div className="flex justify-center items-center absolute -left-4 shadow-lg w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full ">
                          <img
                            src="/images/admin.png"
                            alt="admin-photo"
                            className="w-full h-full rounded-full shadow-lg "
                          />
                        </div>
                        <div className="p-3 border rounded-lg shadow-sm bg-slate-800 border-slate-600">
                          <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-primarySemiBold">
                              Admin
                            </h2>
                            <time className="mb-1 text-sm font-primaryMedium sm:order-last sm:mb-0">
                              4 Days Ago
                            </time>
                          </div>
                          <div className="p-2 text-sm border rounded-lg bg-slate-700 border-slate-800 font-primaryMediumItalic">
                            How are you?
                          </div>
                        </div>
                      </li>

                      <li className="mb-3 ml-7">
                        <div className="flex justify-center items-center absolute -left-4 shadow-lg w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full ">
                          <img
                            src="/images/admin.png"
                            alt="admin-photo"
                            className="w-full h-full rounded-full shadow-lg "
                          />
                        </div>
                        <div className="p-3 border rounded-lg shadow-sm bg-slate-800 border-slate-600">
                          <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-primarySemiBold">
                              Admin
                            </h2>
                            <time className="mb-1 text-sm font-primaryMedium sm:order-last sm:mb-0">
                              4 Days Ago
                            </time>
                          </div>
                          <div className="p-2 text-sm border rounded-lg bg-slate-700 border-slate-800 font-primaryMediumItalic">
                            How are you?
                          </div>
                        </div>
                      </li>

                      <li className="mb-3 ml-7">
                        <div className="flex justify-center items-center absolute -left-4 shadow-lg w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full ">
                          <img
                            src="/images/admin.png"
                            alt="admin-photo"
                            className="w-full h-full rounded-full shadow-lg "
                          />
                        </div>
                        <div className="p-3 border rounded-lg shadow-sm bg-slate-800 border-slate-600">
                          <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-primarySemiBold">
                              Admin
                            </h2>
                            <time className="mb-1 text-sm font-primaryMedium sm:order-last sm:mb-0">
                              4 Days Ago
                            </time>
                          </div>
                          <div className="p-2 text-sm border rounded-lg bg-slate-700 border-slate-800 font-primaryMediumItalic">
                            How are you?
                          </div>
                        </div>
                      </li>

                      <li className="mb-3 ml-7">
                        <div className="flex justify-center items-center absolute -left-4 shadow-lg w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full ">
                          <img
                            src="/images/admin.png"
                            alt="admin-photo"
                            className="w-full h-full rounded-full shadow-lg "
                          />
                        </div>
                        <div className="p-3 border rounded-lg shadow-sm bg-slate-800 border-slate-600">
                          <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-primarySemiBold">
                              Admin
                            </h2>
                            <time className="mb-1 text-sm font-primaryMedium sm:order-last sm:mb-0">
                              4 Days Ago
                            </time>
                          </div>
                          <div className="p-2 text-sm text-justify border rounded-lg bg-slate-700 border-slate-800 font-primaryMediumItalic">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Blanditiis dicta repellat sequi quae sapiente,
                            porro sunt optio iste aliquid quis possimus
                            pariatur, labore, magni laboriosam eveniet?
                            Repudiandae eveniet placeat cupiditate.
                          </div>
                        </div>
                      </li>

                      <li className="mb-3 ml-7">
                        <div className="flex justify-center items-center absolute -left-4 shadow-lg w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full">
                          <img
                            src="/images/admin.png"
                            alt="admin-photo"
                            className="w-full h-full rounded-full shadow-lg "
                          />
                        </div>
                        <div className="p-3 border rounded-lg shadow-sm bg-slate-800 border-slate-600">
                          <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-primarySemiBold">
                              Admin
                            </h2>
                            <time className="mb-1 text-sm font-primaryMedium sm:order-last sm:mb-0">
                              4 Days Ago
                            </time>
                          </div>
                          <div className="p-2 text-sm text-justify border rounded-lg bg-slate-700 border-slate-800 font-primaryMediumItalic">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Blanditiis dicta repellat sequi quae sapiente,
                            porro sunt optio iste aliquid quis possimus
                            pariatur, labore, magni laboriosam eveniet?
                            Repudiandae eveniet placeat cupiditate.
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent orders */}
            <div className="w-full p-4 bg-[#283046] text-[#d0d2d6] rounded-md mt-6 ">
              {/* header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-primarySemiBold">Recent Orders</h2>
                <Link
                  to=""
                  className="text-lg transition-all duration-300 font-primaryRegular hover:underline hover:text-indigo-600"
                >
                  View All
                </Link>
              </div>
              {/* table */}
              <div className="relative overflow-x-auto">
                <table className="min-w-[800px] w-full text-sm text-[#d0d2d6] text-left ">
                  <thead className="text-sm text-[#d0d2d6] border-b border-slate-700 uppercase font-primaryMedium">
                    <tr>
                      <th className="px-4 py-3" scope="col">
                        order id
                      </th>
                      <th className="px-4 py-3" scope="col">
                        price
                      </th>
                      <th className="px-4 py-3" scope="col">
                        payment status
                      </th>
                      <th className="px-4 py-3" scope="col">
                        order status
                      </th>
                      <th className="px-4 py-3" scope="col">
                        action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    <tr>
                      <td
                        className="px-4 py-3 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        #4568953264
                      </td>
                      <td
                        className="px-4 py-3 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        $ 656
                      </td>
                      <td
                        className="px-4 py-3 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        <span className="">pending</span>
                      </td>
                      <td
                        className="px-4 py-3 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        <span className="">pending</span>
                      </td>
                      <td
                        className="px-4 py-3 whitespace-nowrap font-primaryRegular"
                        scope="col"
                      >
                        <Link to="">view</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
