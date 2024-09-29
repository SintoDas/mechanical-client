import { Button, Table } from "flowbite-react";
import { useGetAllProductsQuery } from "../../redux/features/product/productsApi";
import { TProduct } from "../../types";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import UpdateModal from "./Modal/UpdateModal";

export default function Dashboard() {
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null); // To manage selected product

  // Function to handle opening the modal and setting the selected product
  const handleOpenUpdateModal = (product: TProduct) => {
    setSelectedProduct(product);
    setUpdateModalOpen(true);
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
          {products?.data.map((product: TProduct) => (
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
                  <Button color="failure" className="flex items-center">
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
        />
      )}
    </div>
  );
}
