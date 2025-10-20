import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDetails {
  id: number;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  profileImageUrl: string;
  role: "USER" | "ADMIN" | "MODERATOR";
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
}

interface Breadcrumb {
  title: string;
  href?: string;
}

interface GeneralState {
  totalCount: number | null;
  data: Record<string, any>;
  userDetails: UserDetails;
  breadcrumb: Breadcrumb[];
  collapsedMenu: boolean;
  navbarTitle: string;
}

const initialState: GeneralState = {
  data: {},
  userDetails: {
    id: 0,
    phoneNumber: "",
    firstName: "",
    lastName: "",
    role: "USER",
    profileImageUrl: "",
    status: "ACTIVE",
  },
  navbarTitle: "",
  breadcrumb: [],
  totalCount: 0,
  collapsedMenu: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    changeState: (
      state,
      action: PayloadAction<{ name: keyof GeneralState; value: any }>
    ) => {
      (state[action.payload.name] as any) = action.payload.value;
    },

    setUserDetails: (state, action: PayloadAction<UserDetails>) => {
      state.userDetails = action.payload;
    },
    clearBreadcrumb: (state) => {
      state.breadcrumb = [];
    },
    setCollapsedMenu: (state) => {
      state.collapsedMenu = !state.collapsedMenu;
    },
  },
});

export const {
  changeState,
  setUserDetails,
  clearBreadcrumb,
  setCollapsedMenu,
} = generalSlice.actions;
export default generalSlice.reducer;
