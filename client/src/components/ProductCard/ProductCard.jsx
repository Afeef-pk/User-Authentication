
function Products({product}) {

  return (
    <div className="w-60 flex max-w-xs flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl">
      <div
        className=" mx-2 mt-3 flex h-52 w-56  overflow-hidden rounded-xl "
        href="#">
        <img
          className="object-contain h-52 w-56"
          src={product.image && `http://localhost:4000/public/products/${product.image}`}
          alt="product image"
        />  
      </div>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-md tracking-tight text-slate-900">
          {product.name}
        </h5>
        <div className="mt-2">
          <p>
            <span className="text-3xl font-bold text-slate-900">{product.price}</span>
          </p>
          <p className="my-3">
            <span className="text-md font-bold text-slate-900">
              Category : {product.category}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Products;
