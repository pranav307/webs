import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteCartItem, updateCartQuantity } from "@/store/cartproduct";
import { Minus, Plus, Trash } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { productList } = useSelector((state) => state.shoppingProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeofAction) {
    const getCartItems = cartItems?.items || [];
    const products = productList || [];

    if (typeofAction === "plus") {
      const indexOfCurrentCartItem = getCartItems.findIndex(
        (item) => item.productId === getCartItem?.productId
      );

      const getCurrentProductIndex = products.findIndex(
        (product) => product._id === getCartItem?.productId
      );

      if (getCurrentProductIndex > -1) {
        const getTotalStock = products[getCurrentProductIndex].stock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast({ title: `${getQuantity} no stock available` });
            return;
          }
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeofAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Cart item updated successfully" });
      }
    });
  }

  function handleCartDelete(getCartItem) {
    dispatch(
      deleteCartItem({
        userId: user?.id,
        productId: getCartItem?.productId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Cart item deleted successfully" });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img src={cartItem?.image} className="w-20 h-20 rounded object-cover" />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ${(cartItem?.price * cartItem?.quantity).toFixed(2)}
        </p>
        <Trash
          onClick={() => handleCartDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
