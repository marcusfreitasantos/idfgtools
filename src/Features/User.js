import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nome: "",
  sobrenome: "",
  email: "",
  funcao: "",
  setor: "",
  avatar: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialState,
  },
  reducers: {
    userLoginRedux: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { userLoginRedux } = userSlice.actions;

export default userSlice.reducer;
