import { Button, Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { TProduct } from "../../../types";
import { useUpdateProductMutation } from "../../../redux/features/product/productsApi";
import axios from "axios";
import { useEffect } from "react";

interface UpdateModalProps {
  updateModalOpen: boolean;
  setUpdateModalOpen: (open: boolean) => void;
  product: TProduct; // Accept selected product details
}

export default function UpdateModal({
  updateModalOpen,
  setUpdateModalOpen,
  product,
}: UpdateModalProps) {
  const [updateProduct] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset, // Reset form to initial values
  } = useForm<TProduct>();

  useEffect(() => {
    // Reset form values when product changes
    if (product) {
      reset({
        title: product.title || "",
        price: product.price || 0,
        description: product.description || "",
        availableQuantity: product.availableQuantity || 0,
        rating: product.rating || 0,
        image: product.image || "",
        brand: product.brand || "",
      });
    }
  }, [product, reset]);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: '96f69d1a403cf9d18c0afb2873019c21', // Replace with your ImageBB API Key
          },
        }
      );

      const imageUrl = response.data.data.url; // Get the image URL from the response
      setValue("image", imageUrl); // Set the image URL in the form
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const onSubmit = async (data: TProduct) => {
    try {
      const response = await updateProduct({ id: product._id, ...data }).unwrap();
      console.log("Update Response:", response);
      setUpdateModalOpen(false); // Close the modal on successful update
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <Modal show={updateModalOpen} onClose={() => setUpdateModalOpen(false)}>
      <Modal.Header>Update Product</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md space-y-4"
          >
            <h2 className="text-2xl font-semibold text-gray-800">Edit Product</h2>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                {...register("title", { required: "Product name is required" })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                step="0.01"
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Available Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Available Quantity</label>
              <input
                type="number"
                {...register("availableQuantity", {
                  required: "Available quantity is required",
                  min: 0,
                })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.availableQuantity && (
                <p className="text-red-500 text-sm mt-1">{errors.availableQuantity.message}</p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <input
                type="number"
                step="0.1"
                {...register("rating", {
                  required: "Rating is required",
                  min: 0,
                  max: 5,
                })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
              )}
            </div>

            {/* Image URL or Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="text"
                {...register("image")}
                placeholder="Enter image URL or upload below"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    uploadImage(e.target.files[0]);
                  }
                }}
                className="mt-2 block w-full text-sm text-gray-600"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand</label>
              <input
                type="text"
                {...register("brand", { required: "Brand is required" })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.brand && (
                <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit Product
            </button>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setUpdateModalOpen(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
