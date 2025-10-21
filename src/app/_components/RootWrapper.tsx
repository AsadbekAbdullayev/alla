// app/_components/RootWrapper.tsx (Client Component)
"use client";
import { QueryProvider } from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import store from "@/redux/store/store";
import { Provider } from "react-redux";

export default function RootWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <Provider store={store}>
        <AuthProvider
          ignorePaths={["/", "/profile", "/login", "/dashboard/login"]}
        >
          {children}
          <ToastContainer
            position="top-right"
            hideProgressBar={true}
            autoClose={10000}
            newestOnTop={false}
            closeOnClick={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="dark"
          />
        </AuthProvider>
      </Provider>
    </QueryProvider>
  );
}
