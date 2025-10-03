"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            {children}
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                toastClassName="custom-toast"
            />
        </Provider>
    );
}