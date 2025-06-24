import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    salon : null ,
    isLoggedIn : false ,
}

const salonSlice = createSlice({
    name : 'salon',
    initialState,
    reducers:{
        loginSalon(state , action){
            state.salon = action.payload ;
            state.isLoggedIn = true ;
        },
         logoutSalon(state) {
      state.salon = null;
      state.isLoggedIn = false;
    },
    }
}) ;
export const{loginSalon , logoutSalon} = salonSlice.actions ;
export default salonSlice.reducer ;