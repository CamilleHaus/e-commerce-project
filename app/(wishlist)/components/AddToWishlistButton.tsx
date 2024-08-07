"use client";

import { FaHeartCirclePlus } from "react-icons/fa6";
import { useWishlistStore } from "@/store/useWishlistStore";
import { IProductType } from "@/types/productTypes";
import toast from "react-hot-toast";


const AddToWishlistButton = ({
  name,
  id,
  image,
  quantity,
  unit_amount,
}: IProductType) => {
  const wishlistStore = useWishlistStore();

  const addToWishlist = () => {
    const existingItem = wishlistStore.wishList.find(
      (wishItem) => wishItem.id === id
    );

    if (existingItem) {
      toast.error(`${name} is already in your wishlist`);
    } else {
      wishlistStore.addToWishlist({
        name,
        id,
        image,
        unit_amount,
        quantity: 1,
      });

      toast.success(`${name} added to wishlist!`);
    }
  };

  return (
    <div onClick={addToWishlist}>
      <FaHeartCirclePlus />
    </div>
  );
};

export default AddToWishlistButton;
