// slices/generelSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface UserDetails {
  id: number;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  profileImageUrl: string;
  role: "USER" | "ADMIN" | "MODERATOR";
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
}

interface GeneralState {
  totalCount: number | null;
  data: Record<string, any>;
  userDetails: UserDetails;
  breadcrumb: BreadcrumbItem[];
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
  breadcrumb: [{ title: "Bosh sahifa", href: "/" }],
  totalCount: 0,
  collapsedMenu: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setBreadcrumb: (state, action: PayloadAction<BreadcrumbItem[]>) => {
      state.breadcrumb = action.payload;
    },
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
      state.breadcrumb = [{ title: "Bosh sahifa", href: "/" }];
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
  setBreadcrumb, // Yangi eksport
} = generalSlice.actions;

export default generalSlice.reducer;
