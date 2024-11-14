import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    // Add return here
    <div>
      <div>Header part</div>

      <div className="text-blue-300">
        <Outlet /> {/* This is where nested routes will render */}
      </div>
    </div>
  );
};

export default AuthLayout;
