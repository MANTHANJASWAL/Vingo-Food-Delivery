import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setIsShopLoading, setMyShopData } from "../redux/ownerSlice";

function UseGetMyShop() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData?.role !== "owner") {
      dispatch(setMyShopData(null));
      dispatch(setIsShopLoading(false));
      return;
    }

    const fetchShop = async () => {
      dispatch(setIsShopLoading(true));
      try {
        const result = await axios.get(
          `${serverUrl}/api/shop/get-my`,
          {
            withCredentials: true,
          }
        );

        dispatch(setMyShopData(result.data));
      } catch (error) {
        console.log(error);
        dispatch(setMyShopData(null));
      } finally {
        dispatch(setIsShopLoading(false));
      }
    };

    fetchShop();
  }, [dispatch, userData]);
}

export default UseGetMyShop;
