// App.jsx
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import AuthLayout from "./pages/auth/authlayout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/signUp";
import AdminLayout from "./components/adminviewss/layout";
import AdminDashboard from "./pages/admin/adminlayout";
import CreateProduct from "./pages/admin/createproduct";
import AdminOrdersView from "./components/adminviewss/order";
import ShoppingLayout from "./pages/shoppinlayout/shopping";
import ShoppingHome from "./pages/shoppinlayout/shophome";
import ShoppingListing from "./pages/shoppinlayout/shopproducts";
import SearchProducts from "./pages/shoppinlayout/searchresult";
import Checkout from "./pages/shoppinlayout/checkout";
import PaymentSuccessPage from "./pages/shoppinlayout/paymentsuccess";
import PaypalReturnPage from "./pages/shoppinlayout/paypalreturn";
import ShoppingAccount from "./pages/shoppinlayout/account";
import UnauthPage from "./pages/unauthpage";

// Adjust the path as needed
import { Skeleton } from "./components/ui/skeleton";
import Checkauth from "./common/check-auth";
import { checkAuth } from "./store/checkauth";
import PaymentCancel from "./pages/shoppinlayout/paymentcancel";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800px] bg-black h-[600px]" />;

  console.log("Auth State:", { isAuthenticated, user });

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <Checkauth isAuthenticated={isAuthenticated} user={user}>
              {/* Optionally, render a home component here */}
            </Checkauth>
          }
        />
        <Route
          path="/auth"
          element={
            <Checkauth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </Checkauth>
          }
        >
          <Route path="/auth/login" element={<AuthLogin />} />
          <Route path="/auth/signup" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <Checkauth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </Checkauth>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/createproduct" element={<CreateProduct />} />
          <Route path="/admin/orders" element={<AdminOrdersView />} />
        </Route>
        <Route
          path="/shopping"
          element={
            <Checkauth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </Checkauth>
          }
        >
          <Route path="/shopping/listing" element={<ShoppingListing />} />
          <Route path="/shopping/search" element={<SearchProducts />} />
          <Route path="/shopping/home" element={<ShoppingHome />} />
          <Route
            path="/shopping/payment-return"
            element={<PaypalReturnPage />}
          />
          <Route path="/shopping/account" element={<ShoppingAccount />} />
          <Route path="/shopping/checkout" element={<Checkout />} />
          <Route
            path="/shopping/payment-success"
            element={<PaymentSuccessPage />}
          />
          <Route path="/shopping/payment-cancel" element={<PaymentCancel />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;
