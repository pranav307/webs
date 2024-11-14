import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ClearCart } from "@/store/cartproduct";
import { capturePayment } from "@/store/orderslice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");
  useEffect(() => {
    if (paymentId && payerId) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
          dispatch(ClearCart());

          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/shopping/payment-success";
        }
      });
    }
  }, [paymentId, payerId, dispatch]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment...please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;
