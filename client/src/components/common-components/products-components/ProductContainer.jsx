// LOCAL IMPORTS
import Product from "./Product";

const ProductContainer = ({ categorizedProducts }) => {
  return (
    <div>
      <div
        className="  grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          gap-6
          justify-items-center"
      >
        {categorizedProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default ProductContainer;
