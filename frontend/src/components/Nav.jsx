import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LuReceipt } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { setUserData } from "../redux/userSlice";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
function Nav({ searchValue = "", onSearchChange, cartCount = 0 }) {
  const { userData, currentCity } = useSelector((state) => state.user);
  const {myShopData } = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchChange = (e) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };
  const cityLabel = currentCity || "Current city";
  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      {showSearch && userData.role == "user" && (
        <div className="w-[90%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5%]">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{cityLabel}</div>
          </div>
          <div className="w-[80%] flex items-center gap-[10px]">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="px-[10px] text-gray-700 outline-0 w-full"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Vingo</h1>
      {userData.role == "user" && (
        <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{cityLabel}</div>
          </div>
          <div className="w-[80%] flex items-center gap-[10px]">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="Search delicious food..."
              className="px-[10px] text-gray-700 outline-0 w-full"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        {userData.role == "user" &&
          (showSearch ? (
            <RxCross1
              size={25}
              className="text-[#ff4d2d] md:hidden cursor-pointer"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <IoIosSearch
              size={25}
              className="text-[#ff4d2d] md:hidden cursor-pointer"
              onClick={() => setShowSearch(true)}
            />
          ))}
          {userData.role=="owner"?<>
          {myShopData &&<> <button className='hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]' onClick={()=>navigate("/add-item")}>
            <FaPlus size={20}/>
            <span>Add Food Item</span>
            </button>
            <button className='md:hidden flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]' onClick={()=>navigate("/add-item")}>
            <FaPlus size={20}/>
            </button></> }
            
            <div className='hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'>
              <LuReceipt />
              <span>My Orders</span>
              <span className='absolute -right-2 -top-2 text-xs font-bold text-white  bg-[#ff4d2d] rounded-full px-[6px] py-[1px]'>0</span>
            </div>
            <div className='md:hidden flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'>
              <LuReceipt />
              <span className='absolute -right-2 -top-2 text-xs font-bold text-white  bg-[#ff4d2d] rounded-full px-[6px] py-[1px]'>0</span>
            </div>
            </>: (
              <>
              <div className="relative cursor-pointer">
            <IoCartOutline size={25} className="text-[#ff4d2d]" />
            <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">
              {cartCount}
            </span>
          </div>
        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium">
          My Orders
        </button>
              </>
            )}
          
        <div
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullname?.slice(0, 1)}
        </div>
        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold">{userData.fullname}</div>
            {userData.role=="user" && <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">
              My Orders
            </div>} 
            <div
              className="text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={handleLogOut}
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
