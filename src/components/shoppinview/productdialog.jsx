import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/cartproduct";
import { setProductDetails } from "@/store/shopproducts";
import { addReview, getReview } from "@/store/reviewslice";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import StarRatingComponent from "@/common/starRating";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { reviews } = useSelector((state) => state.review);
  const { toast } = useToast();

  const handleRatingChange = (getrating) => {
    setRating(getrating);
  };

  const handleAddToCart = (productId, totalStock) => {
    const currentCartItems = cartItems.items || [];
    const existingItemIndex = currentCartItems.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex > -1) {
      const currentQuantity = currentCartItems[existingItemIndex].quantity;
      if (currentQuantity + 1 > totalStock) {
        toast({ title: `Only ${currentQuantity} quantity can be added` });
        return;
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product successfully added to cart" });
      }
    });
  };

  const handleAddReview = () => {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        username: user?.username,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReview(productDetails?._id));
        toast({ title: "Review added successfully" });
      }
    });
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  };

  useEffect(() => {
    if (productDetails) dispatch(getReview(productDetails._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image || "/placeholder-image.jpg"}
            alt={productDetails?.name || "Product Image"}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold">
            {productDetails?.name || "Product Name"}
          </h1>
          <p className="text-muted-foreground text-2xl mb-5 mt-4">
            {productDetails?.description || "Product Description"}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-primary">
              ${productDetails?.price ?? "0.00"}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <StarRatingComponent rating={averageReview} />
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.stock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(productDetails?._id, productDetails?.stock)
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h1 className="text-xl font-bold mb-4">Reviews</h1>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {review.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{review.username}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={review.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {review.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No reviews</h1>
              )}
            </div>
            <div className="mt-10 flex flex-col gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />{" "}
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button onClick={handleAddReview} disabled={!reviewMsg.trim()}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
