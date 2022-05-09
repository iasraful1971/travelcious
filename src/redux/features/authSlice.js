import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

// login thunk 
export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, {rejectWithValue}) => {
    try {
      const response = await api.signIn(formValue);
      toast.success("login success");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

// google sign in thunk 
export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async ({ result, navigate, toast }, {rejectWithValue}) => {
    try {
      const response = await api.googleSignIn(result);
      toast.success("google login success");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

// register thunk 
export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, {rejectWithValue}) => {
    try {
      const response = await api.signUp(formValue);
      toast.success("Register success");
      navigate("/login");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);




const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers:{
    setUser: (state, action) =>{
      state.user = action.payload
    },
    setLogout: (state, action) => {
      state.user = null;
      localStorage.clear();
    }

  },
  extraReducers: {
    // login 
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // google 
    [googleSignIn.pending]: (state, action) => {
      state.loading = true;
    },
    [googleSignIn.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [googleSignIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },


    // register 
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default authSlice.reducer;
export const {setUser , setLogout} = authSlice.actions