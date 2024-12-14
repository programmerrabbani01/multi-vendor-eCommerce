export default function SellerDetails() {
  return (
    <>
      <div className="px-2 pt-5 lg:px-7">
        <div className="w-full p-4 bg-[#283046] text-[#d0d2d6] rounded-md ">
          {/* image and details */}
          <div className="flex flex-wrap w-full">
            {/* image */}
            <div className="flex items-center justify-center w-3/12 py-3">
              <div className="">
                <img
                  src="/images/seller.png"
                  alt=""
                  className="w-full h-[230px] overflow-hidden object-cover "
                />
              </div>
            </div>
            {/* Basic Info */}
            <div className="w-4/12">
              <div className="px-0 py-2 md:px-5">
                <div className="py-2 text-lg capitalize font-primaryMedium">
                  <h2>basic info</h2>
                </div>
                {/* basic info details */}
                <div className="flex flex-col justify-between gap-2 p-4 text-base rounded-md bg-slate-800 ">
                  <div className="flex gap-2">
                    <span className="font-primarySemiBold">Name :</span>
                    <span className="font-primaryRegular">
                      G M GOLAM RABBANI
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-primarySemiBold">Email :</span>
                    <span className="font-primaryRegular">rab@gmail.com</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-primarySemiBold">Role :</span>
                    <span className="font-primaryRegular">Seller</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-primarySemiBold">Status :</span>
                    <span className="font-primaryRegular">Active</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-primarySemiBold">
                      Payment Account :
                    </span>
                    <span className="font-primaryRegular">Active</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Address */}
            <div className="w-4/12">
              <div className="px-0 py-2 md:px-5">
                <div className="py-2 text-lg capitalize font-primaryMedium">
                  <h2>address</h2>
                </div>
                {/* Address details */}
                <div className="flex flex-col justify-between gap-2 p-4 rounded-md bg-slate-800 ">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-primarySemiBold">
                      Shop Name :
                    </span>
                    <span className="text-xs font-primaryRegular ">
                      Rabbani Multi Variate Store
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-primarySemiBold">
                      Division :
                    </span>
                    <span className="text-xs font-primaryRegular ">
                      Barishal
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-primarySemiBold">
                      District :
                    </span>
                    <span className="text-xs font-primaryRegular ">
                      Patuakhali
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
          {/* button */}
          <div className="">
            <form action="">
              <div className="flex gap-4 py-3">
                <select
                  name=""
                  id=""
                  className="px-4 py-2 border border-slate-700 focus:border-indigo-500 bg-[#283046] rounded-md outline-none text-[#d0d2d6] font-primaryRegular "
                >
                  <option value="">--Select Status--</option>
                  <option value="active">Active</option>
                  <option value="deactive">Deactive</option>
                </select>

                <button
                  type="submit"
                  className="w-[170px] py-2 text-lg bg-blue-500 rounded-md hover:shadow-blue-500/50 hover:shadow-lg font-primaryMedium "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
