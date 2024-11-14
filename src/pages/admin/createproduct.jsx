import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import CommonForm from "@/common/form";
import { addProductFormElements } from "../confirmSchema";
import ProductimageUpload from "@/components/productimage";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/productauth";
import AdminProductTile from "@/components/adminviewss/producttile";
import { useToast } from "@/hooks/use-toast";

const initialFormData = {
  image: null,
  name: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  ratings: "",
  stock: "",
  averageReview: 0,
};

const CreateProduct = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted: ", formData);

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(addNewProduct({ ...formData, image: uploadedImageUrl })).then(
          (data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setOpenCreateProductsDialog(false);
              setImageFile(null);
              setFormData(initialFormData);
              toast({ title: "product add successfully" });
            }
          }
        );
  };

  function handleDelete(currentProductId) {
    dispatch(deleteProduct(currentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageRating")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(formData, "productlist");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Create Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem.id} // Add a key for React list rendering
                product={productItem}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                handleDelete={handleDelete}
                setCurrentEditedId={setCurrentEditedId}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent slide="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "New Product"}
            </SheetTitle>
            <SheetDescription>
              Fill out the form below to create a new product. Ensure all
              required fields are completed.
            </SheetDescription>
          </SheetHeader>
          <ProductimageUpload
            ImageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isEditMode={currentEditedId !== null} // Pass boolean to indicate edit mode
              buttonText={currentEditedId !== null ? "Edit" : "Submit"}
              isBtnDisabled={!isFormValid()} // Disable the button if form is not valid
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default CreateProduct;
