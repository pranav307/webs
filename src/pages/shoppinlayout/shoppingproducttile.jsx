import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { brandOptionsMap, categoryOptionsMap } from "../confirmSchema";
import { Button } from "@/components/ui/button";

function ShoppingproductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-[300px] object-cover rounded-lg"
          />
          {product?.stock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              out of stock
            </Badge>
          ) : product?.stock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`only ${product?.stock} items left`}
            </Badge>
          ) : null}
        </div>
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2">{product?.name}</h2>
        <div className="flex justify-items-center mb-2">
          <span className="text-[16px] text-muted-foreground">
            {categoryOptionsMap[product?.category]}
          </span>
          <span className="text-[16px] text-muted-foreground">
            {brandOptionsMap[product?.brand]}
          </span>
        </div>
        <div>
          <span>${product?.price}</span>
        </div>
      </CardContent>
      <CardFooter>
        {product?.stock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            out of stock
          </Button>
        ) : (
          <Button
            onClick={() => handleAddtoCart(product?._id, product?.stock)}
            className="w-full"
          >
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingproductTile;
