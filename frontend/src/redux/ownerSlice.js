import { createSlice } from "@reduxjs/toolkit";

const ownerSlice=createSlice({
  name:"owner",
  initialState:{
    myShopData:null,
    isShopLoading:false
  },
  reducers:{
    setMyShopData:(state,action)=>{
      state.myShopData=action.payload
    },
    setIsShopLoading:(state,action)=>{
      state.isShopLoading=action.payload
    }
  }
})

export const {setMyShopData,setIsShopLoading}=ownerSlice.actions;
export default ownerSlice.reducer;
