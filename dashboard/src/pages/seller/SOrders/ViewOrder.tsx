import MetaData from "../../../components/MetaData.tsx";

export default function ViewOrder() {
  const title = "View Order";
  return (
    <>
      <MetaData title={title} />

      {/* start */}

      <div className="px-2 pt-5 lg:px-7">
        <div className="w-full p-4 bg-[#283046] text-[#d0d2d6] rounded-md ">
          {/* top */}
          <div className="flex items-center justify-between p-4">
            <h2 className="text-2xl uppercase font-primaryMedium">
              order details
            </h2>
            <select
              name=""
              id=""
              className="px-4 py-2 border border-slate-700 focus:border-indigo-500 bg-[#283046] rounded-md outline-none text-[#d0d2d6] font-primaryRegular "
            >
              <option value="">-- Select --</option>
              <option value="pending">pending</option>
              <option value="processing">processing</option>
              <option value="warehouse">warehouse</option>
              <option value="placed">placed</option>
              <option value="cancelled">cancelled</option>
            </select>
          </div>
          {/* bottom */}
          <div className="p-4">
            <div className="flex gap-2 text-lg font-primaryRegular">
              <h2>#2536585574</h2>
              <span>3 jun 2024</span>
            </div>
            <div className="flex flex-wrap">
              {/* left */}
              <div className="w-[32%]">
                <div className="pr-3 text-lg font-primaryRegular">
                  <div className="flex flex-col gap-1">
                    <h2 className="pb-2">Deliver To : Warehouse</h2>
                  </div>
                  <div className="flex items-center justify-start gap-3">
                    <h2>Payment Status :</h2>
                    <span className="text-base">Paid</span>
                  </div>
                  <span className="">Price : $5565</span>
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex gap-3 text-base">
                      <img
                        src="/images/Gucci-Bloom-Perfume.jpg"
                        alt=""
                        className="w-20 h-20"
                      />
                      <div className="">
                        <h2>Gucci Perfume</h2>
                        <p>
                          <span>Brand :</span>
                          <span> Gucci </span>
                        </p>
                        <span>Quantity : 2</span>
                      </div>
                    </div>

                    <div className="flex gap-3 text-base">
                      <img
                        src="/images/Gucci-Bloom-Perfume.jpg"
                        alt=""
                        className="w-20 h-20"
                      />
                      <div className="">
                        <h2>Gucci Perfume</h2>
                        <p>
                          <span>Brand :</span>
                          <span> Gucci </span>
                        </p>
                        <span>Quantity : 2</span>
                      </div>
                    </div>

                    <div className="flex gap-3 text-base">
                      <img
                        src="/images/Gucci-Bloom-Perfume.jpg"
                        alt=""
                        className="w-20 h-20"
                      />
                      <div className="">
                        <h2>Gucci Perfume</h2>
                        <p>
                          <span>Brand :</span>
                          <span> Gucci </span>
                        </p>
                        <span>Quantity : 2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
