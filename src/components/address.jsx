import {
  addNewAddress,
  deleteAddress,
  editaddress,
  fetchAllAddresses,
} from "@/store/addressauth";
import AddessCard from "./address-card";

import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import CommonForm from "@/common/form";
import { addressFormControls } from "@/pages/confirmSchema";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formdata, setFormdata] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.address);
  const { toast } = useToast();

  function handleManageAddress(event) {
    event.preventDefault();
    if (addressList.length >= 3 && currentEditedId === null) {
      setFormdata(initialAddressFormData);
      toast({ title: "you can add max 3" });
      return;
    }
    currentEditedId !== null
      ? dispatch(
          editaddress({
            userId: user?.id,
            addressId: currentEditedId,
            formdata,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormdata(initialAddressFormData);
            toast({ title: "address updated successfully" });
          }
        })
      : dispatch(
          addNewAddress({
            ...formdata,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormdata(initialAddressFormData);
            toast({ title: "address added succesfully" });
          }
        });
  }

  function handleDeleteAddress(getcurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getcurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({ title: "address deleted succesfully" });
      }
    });
  }
  function handleEditAddress(getcurrentAddress) {
    setCurrentEditedId(getcurrentAddress?._id);
    setFormdata({
      ...formdata,
      address: getcurrentAddress?.address,
      city: getcurrentAddress?.city,
      phone: getcurrentAddress?.phone,
      pincode: getcurrentAddress?.pincode,
      notes: getcurrentAddress?.notes,
    });
  }
  function isFormValid() {
    return Object.keys(formdata)
      .map((key) => formdata[key].trim() !== "")
      .every((item) => item);
  }
  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddessItem) => (
              <AddessCard
                key={singleAddessItem._id}
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddessItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : " Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formdata}
          setFormData={setFormdata}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
