"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import Image from "next/image";
import AddToCart from "@/app/(shoppingCart)/components/ui/AddToCart";
import Button from "@/components/ui/Button";
import { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const wishlistStore = useWishlistStore();

  const [selectedSize, setSelectedSize] = useState("");

  const isSizeSelected = selectedSize !== "";

  const showToast = () => {
    toast.error("Please choose a size first");
  };

  return (
    <div className="py-20">
      <div className="main-container">
        {wishlistStore.wishList.length > 0 ? (
          <>
            <span className="font-bold">
              You have {wishlistStore.wishList.length} items in your wishlist
            </span>
            <div className="flex flex-wrap gap-10 max-md:justify-center">
              {wishlistStore.wishList.map((product) => (
                <div key={product.id}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                  />
                  <h1 className="font-bold">{product.name}</h1>
                  <div className="flex flex-col gap-3">
                    <div className="space-x-2">
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="my-2 p-2 border rounded-md"
                      >
                        <option value="">Select Size</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>

                      <AddToCart
                        name={product.name}
                        image={product.image}
                        price={product.unit_amount}
                        id={product.price_id!}
                        currency="USD"
                        onClick={!isSizeSelected ? showToast : undefined}
                      />
                    </div>
                    <Button
                      onClick={() =>
                        wishlistStore.removeFromWishlist({ ...product })
                      }
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full flex justify-center items-center">
            <h1 className="font-bold text-xl">Your Wishlist is Empty</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
