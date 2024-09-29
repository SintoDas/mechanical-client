import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { TProduct } from '../../../types';
import { useAddProductMutation } from '../../../redux/features/product/productsApi';
import { toast } from 'sonner'; // Import Sonner components

const CreateProduct: React.FC = () => {
  const [addProduct] = useAddProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TProduct>();

  const [imgUrl, setImgUrl] = useState<string>('');

  // Optional: Replace with your ImgBB API key
  const imgbbAPIKey = '96f69d1a403cf9d18c0afb2873019c21';

  // Form submission handler
  const onSubmit: SubmitHandler<TProduct> = async (data) => {
    const productData = {
      ...data,
      price: parseFloat(data.price.toString()), // Ensure price is a number
      availableQuantity: parseInt(data.availableQuantity.toString(), 10), // Ensure availableQuantity is a number
      rating: parseFloat(data.rating.toString()), // Ensure rating is a number
      image: imgUrl,
    };

    try {
      // Call the mutation to add the product
      const response = await addProduct(productData).unwrap();
      if (response) {
        toast.success('Product added successfully!'); // Show success notification
      }
    } catch (error: any) {
      toast.error('Failed to add product. Please try again.'); // Show error notification
    }

    // Reset form after submission
    reset();
    setImgUrl('');
  };

  // Image upload handler
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );

      if (response.data.success) {
        setImgUrl(response.data.data.url);
        toast.success('Image uploaded successfully!'); // Show success notification for image upload
      }
    } catch {
      toast.error('Failed to upload image. Please try again.'); // Show error notification
    }
  };

  return (
    <div>
      {/* Sonner Toaster component */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            {...register('title', { required: 'Product name is required' })}
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
            {...register('price', { required: 'Price is required', min: 0 })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Available Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Available Quantity
          </label>
          <input
            type="number"
            {...register('availableQuantity', {
              required: 'Available quantity is required',
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
            {...register('rating', {
              required: 'Rating is required',
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
            {...register('image')}
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
            {...register('brand', { required: 'Brand is required' })}
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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
