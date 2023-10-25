import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  avatarUser: string;
  name: string;
  password: string;
  userEmail: string;
  userPhoneNumber: string;
  userRole: string;
  username: string;
  status: string;
}

interface UserState {
  selectedUser: any;
  currentUser: User | null;
  users: User[];
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  selectedUser: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },

    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUserData: (state, action: PayloadAction<UserState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  setUser,
  setSelectedUser,
  clearUser,
  setUsers,
  addUser,
  updateUserData,
} = userSlice.actions;

export default userSlice.reducer;
