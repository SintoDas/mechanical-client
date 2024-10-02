import { Button, Table } from "flowbite-react";
import { useDeleteProductMutation, useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import { TProduct } from "../../types";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import UpdateModal from "./Modal/UpdateModal";

import { toast } from "sonner"; // Import sonner for toast notifications
import ConfirmationModal from "./Modal/ConfirmationModal";

export default function Dashboard() {
  const { data: products, isLoading, error, refetch } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<TProduct | null>(null); // Track product to delete

  // Function to handle opening the modal and setting the selected product
  const handleOpenUpdateModal = (product: TProduct) => {
    setSelectedProduct(product);
    setUpdateModalOpen(true);
  };

  // Open confirmation modal
  const openConfirmation = (product: TProduct) => {
    setProductToDelete(product);
    setConfirmationOpen(true);
  };

  // Handle product deletion
  const handleDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete._id).unwrap();
        toast.success(`${productToDelete.title} deleted successfully!`);
        refetch(); // Refetch products after deletion
      } catch (err) {
        console.error("Failed to delete product", err);
        toast.error(`Failed to delete ${productToDelete.title}`);
      } finally {
        setConfirmationOpen(false); // Close confirmation modal
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong. Please try again later.</p>;

  return (
    <div className="p-4">
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Product Name</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Brand</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {products?.data?.results.map((product: TProduct) => (
            <Table.Row key={product._id}>
              <Table.Cell>{product.title}</Table.Cell>
              <Table.Cell>${product.price}</Table.Cell>
              <Table.Cell>{product.brand}</Table.Cell>
              <Table.Cell>
                <div className="flex justify-evenly items-center">
                  <Button
                    className="mr-2 flex items-center"
                    onClick={() => handleOpenUpdateModal(product)}
                  >
                    <PencilSquareIcon className="w-5 h-5 mr-1" />
                    Update
                  </Button>
                  <Button
                    color="failure"
                    className="flex items-center"
                    onClick={() => openConfirmation(product)} // Open confirmation modal before deleting
                  >
                    <TrashIcon className="w-5 h-5 mr-1" />
                    Delete
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <div className="flex justify-center mt-6">
        <Link to="/create-product">
          <Button className="px-6 py-2">Add Product</Button>
        </Link>
      </div>

      {/* UpdateModal for updating product details */}
      {selectedProduct && (
        <UpdateModal
        updateModalOpen={updateModalOpen}
        setUpdateModalOpen={setUpdateModalOpen}
        product={selectedProduct}
        refetch={refetch} // Pass refetch to UpdateModal
        />
      )}

      {/* Confirmation Modal for delete action */}
      {productToDelete && (
        <ConfirmationModal
          isOpen={confirmationOpen}
          onClose={() => setConfirmationOpen(false)}
          onConfirm={handleDelete}
          productName={productToDelete.title}
        />
      )}
    </div>
  );
}
