import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Role {
  roleName: string;
  userUse: string;
  description: string;
}

interface RoleState {
  selectedRole: any;
  roles: Role[];
}

const initialState: RoleState = {
  roles: [],
  selectedRole: null,
};

const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role[]>) => {
      state.roles = action.payload;
    },
    setSelectedRole: (state, action: PayloadAction<Role | null>) => {
      state.selectedRole = action.payload;
    },
    addRole: (state, action: PayloadAction<Role>) => {
      state.roles.push(action.payload);
    },
    updateRoleData: (state, action: PayloadAction<RoleState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setRole, setSelectedRole, updateRoleData, addRole } =
  roleSlice.actions;

export default roleSlice.reducer;
