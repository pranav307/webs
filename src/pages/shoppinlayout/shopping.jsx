import { Outlet } from "react-router-dom";
import { ShoppingHeaders } from "./headers.jsx";

const ShoppingLayout = () => {
  return (
    <>
      <div className="flex flex-col bg-white overflow-hidden">
        <ShoppingHeaders />

        <main className="flex flex-col w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default ShoppingLayout;
