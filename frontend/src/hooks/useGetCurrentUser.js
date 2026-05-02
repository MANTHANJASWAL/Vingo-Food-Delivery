import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function UseGetCurrentUser() {
  const dispatch=useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser();
  }, [])
}

export default UseGetCurrentUser;
