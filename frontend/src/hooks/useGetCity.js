import React, { useEffect } from "react";
import { serverUrl } from "../App";
import { setCurrentAddress, setCurrentCity, setCurrentState, setUserData } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";

function UseGetCity() {
  const dispatch=useDispatch();
  const {userData}=useSelector(state=>state.user);
  const location=useLocation();
  const apiKey=import.meta.env.VITE_GEOAPIKEY
  useEffect(()=>{
    if(location.pathname.startsWith("/edit-item") || !navigator.geolocation){
      return;
    }
    navigator.geolocation.getCurrentPosition(async (position)=>{
      const latitude =position.coords.latitude;
      const longitude=position.coords.longitude;
      const result=await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)
      dispatch(setCurrentCity(result?.data?.results[0].city));
      dispatch(setCurrentState(result?.data?.results[0].state));
      dispatch(setCurrentAddress(result?.data?.results[0].address_line2 ||result?.data?.results[0].address_line1));
    },()=>{
      dispatch(setCurrentCity(""));
      dispatch(setCurrentState(""));
      dispatch(setCurrentAddress(""));
    })
  },[userData, location.pathname])
}

export default UseGetCity;
