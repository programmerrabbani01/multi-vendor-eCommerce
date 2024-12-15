export default function OrderDetails() {
  return (
    <>
      <div className="px-2 pt-5 lg:px-7">
        <div className="w-full p-4 bg-[#283046] text-[#d0d2d6] rounded-md ">
          {/* top */}
          <div className="flex justify-between items-center p-4">
            <h2 className="text-2xl font-primaryMedium uppercase">
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
                    <h2 className="pb-2">Deliver To : Golam Rabbani</h2>
                    <p className="text-sm">
                      Patuakhali , Shantibug Road ,{" "}
                      <span>House No : #5456</span>
                    </p>
                  </div>
                  <div className="flex justify-start items-center gap-3">
                    <h2>Payment Status :</h2>
                    <span className="text-base">Paid</span>
                  </div>
                  <span className="">Price : $5565</span>
                  <div className="mt-4 flex flex-col gap-4">
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
              {/* right */}
              <div className="w-[68%] text-[#d0d2d6]">
                <div className="pl-3">
                  <div className="item">
                    <div className="mt-4 flex flex-col">
                      <div className="flex justify-start items-center gap-3">
                        <h2 className="text-lg font-primarySemiBold">
                          Seller 1 Order :
                        </h2>
                        <span className="text-base font-primaryRegular">
                          Pending
                        </span>
                      </div>

                      <div className="flex gap-3 text-base mt-2">
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

                  <div className="item">
                    <div className="mt-4 flex flex-col">
                      <div className="flex justify-start items-center gap-3">
                        <h2 className="text-lg font-primarySemiBold">
                          Seller 2 Order :
                        </h2>
                        <span className="text-base font-primaryRegular">
                          Pending
                        </span>
                      </div>

                      <div className="flex gap-3 text-base mt-2">
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

                  <div className="item">
                    <div className="mt-4 flex flex-col">
                      <div className="flex justify-start items-center gap-3">
                        <h2 className="text-lg font-primarySemiBold">
                          Seller 3 Order :
                        </h2>
                        <span className="text-base font-primaryRegular">
                          Pending
                        </span>
                      </div>

                      <div className="flex gap-3 text-base mt-2">
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
      </div>
    </>
  );
}
