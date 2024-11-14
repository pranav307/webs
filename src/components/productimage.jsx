import { Label } from "@/components/ui/label";
import React, { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
function ProductimageUpload({
  ImageFile,
  setImageFile,
  imageLoadingState,
  setImageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);
  console.log(isEditMode, "iseditmode");
  function handleImageUpload(event) {
    console.log(event.target.files, "event.target.files");
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }
  function handleRemove() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  function handleDragover(event) {
    event.preventDefault();
  }
  function handledrop(event) {
    event.preventDefault();
    const dropFile = event.dataTransfer.files?.[0];
    if (dropFile) setImageFile(dropFile);
  }
  async function uploadImagetocloudnary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("file", ImageFile);
    const response = await axios.post("/api/uploadimage", data);
    console.log(response, "response");
    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }
  useEffect(() => {
    if (ImageFile !== null) uploadImagetocloudnary();
  }, [ImageFile]);

  return (
    <div
      className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
    >
      <Label className=" text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragover}
        onDrop={handledrop}
        className={`${isEditMode ? "opacity-60" : ""}
      border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={handleImageUpload}
          disabled={isEditMode}
        />

        {!ImageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span> Drag and drop or click to image uplaod</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className=" w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{ImageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemove}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
export default ProductimageUpload;
