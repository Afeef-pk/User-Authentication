import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import Pagination from "../Pagination/Pagination";

function Home() {
  const [modal, setmodal] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [errors, setErrors] = useState({});

  const [totalProduct, setTotalProduct] = useState(0);
  const [activePage, setActivePage] = useState(1);
  

  useEffect(() => {
    axios.get("http://localhost:4000/api/product",{params: {page:activePage}}).then(({ data }) => {
      setAllProducts(data.products);
      setTotalProduct(data.totalProducts);
    });
  }, [modal,activePage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!productName.trim()) {
      newErrors.productName = "Product name is required";
    }

    if (!productPrice.trim() || isNaN(parseFloat(productPrice))) {
      newErrors.productPrice = "Valid product price is required";
    }

    if (!productCategory.trim()) {
      newErrors.productCategory = "Product category is required";
    }

    if (!productImage) {
      newErrors.productImage = "Product image is required";
    }

    if (Object.keys(newErrors).length === 0) {
      axios
        .post(
          "http://localhost:4000/api/product",
          { productName, productPrice, productCategory, productImage },
          {
            headers: {
              withCredentials: true,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(({ data }) => {
          toast.success(data.message);
          setmodal(false);
          setProductName("");
          setProductPrice("");
          setProductCategory("");
          setProductImage(null);
        });
    } else {
      setErrors(newErrors);
    }
  };
  return (
    <div className="mx-14 my-28">
      <button
        onClick={() => setmodal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Product
      </button>
      <div className="gap-5 grid  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
        {allProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <Pagination  activePage={activePage} setActivePage={setActivePage} limit={4} totalProduct={totalProduct}/>
      {modal && (
        <div className="fixed inset-0  bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
          <div className="relative flex flex-col items-center bg-gray-50 ">
            <div className="bg-black opacity-60 inset-0 z-0" />
            <div className="sm:max-w-lg w-96 px-10 py-7 bg-white rounded-xl z-10">
              <div className="flex justify-between text-center">
                <h2 className=" text-3xl font-bold text-gray-900">
                  Product Upload !
                </h2>
                <button
                  className=" text-red-600"
                  onClick={() => setmodal(false)}>
                  <img
                    className="h-5"
                    src="https://cdn-icons-png.flaticon.com/512/1828/1828665.png"
                    alt=""
                  />
                </button>
              </div>
              <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 space-y-2">
                  <label className="text-sm font-bold text-gray-500 tracking-wide">
                    Title
                  </label>
                  <input
                    className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="text"
                    placeholder="Product name"
                    value={productName}
                    name="title"
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  {errors.productName && (
                    <span className="text-red-600 text-xs">
                      {errors.productName}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 space-y-2">
                  <label className="text-sm font-bold text-gray-500 tracking-wide">
                    Price
                  </label>
                  <input
                    className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="text"
                    placeholder="Product price"
                    value={productPrice}
                    name="title"
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                  {errors.productPrice && (
                    <span className="text-red-600 text-xs">
                      {errors.productPrice}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 space-y-2">
                  <label className="text-sm font-bold text-gray-500 tracking-wide">
                    Category
                  </label>
                  <input
                    className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    type="text"
                    placeholder="Product Category"
                    value={productCategory}
                    name="title"
                    onChange={(e) => setProductCategory(e.target.value)}
                  />
                  {errors.productCategory && (
                    <span className="text-red-600 text-xs">
                      {errors.productCategory}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 space-y-2">
                  <label className="text-sm font-bold text-gray-500 tracking-wide">
                    Product Image
                  </label>
                  <input
                    className="block w-full mb-5 text-sm  border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
                    id="default_size"
                    type="file"
                    onChange={(e) => setProductImage(e.target.files[0])}
                  />
                  <p className="mt-2 text-sm text-black ">SVG, PNG, JPG</p>
                  {errors.productImage && (
                    <span className="text-red-600 text-xs">
                      {errors.productImage}
                    </span>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
