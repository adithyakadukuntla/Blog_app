import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const userLoginThunk=createAsyncThunk('userLogin',async(userCred,thunkApi)=>{
    let res;
    if(userCred.userType==='user'){
        res= await axios.post('/user-api/login',userCred)

    }
    if(userCred.userType==='author'){
        res= await axios.post('/author-api/login',userCred)

    }
    if(userCred.userType==='admin'){
        res= await axios.post('/admin-api/login',userCred)
    
    }
    if(res.data.message==='login successfull'){
        // store the jet token in local/session storage
        sessionStorage.setItem('token',res.data.token)
        
        return res.data;
    }else{
        return thunkApi.rejectWithValue(res.data.message)
    }
})





export const userLoginSlice=createSlice({
    name:'user-login-slice',
    initialState:{isPending:false,currentUser:{},errorStatus:false,errorMessage:"",loginStatus:false},
    reducers:{
        resetState:(state,payload)=>{
            state.isPending=false;
            state.currentUser={};
            state.errorStatus=false;
            state.errorMessage=""
            state.loginStatus=false;
        }
    },
    extraReducers:builder=>builder
    .addCase(userLoginThunk.pending,(state,action)=>{
        state.isPending=true;
    })
    .addCase(userLoginThunk.fulfilled,(state,action)=>{
        state.isPending=false;
        state.currentUser=action.payload.user;
        state.errorStatus=false;
        state.errorMessage=""
        state.loginStatus=true;

    })
    .addCase(userLoginThunk.rejected,(state,action)=>{
        state.isPending=false;
        state.currentUser={};
        state.errorStatus=true;
        state.errorMessage=action.payload;
        state.loginStatus=false;
    })
})



//export root reducer of userLoginSlice
export default userLoginSlice.reducer;
//export action creater
export const {resetState}=userLoginSlice.actions;