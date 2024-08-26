import { useState, useEffect } from "react";
import { axiosClient } from "../utils/axiosClients";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

function Store() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  const handleAddToCart = (product) => {
    const currentQuantity = quantities[product.id] || 0;
    const newQuantity = currentQuantity + 1;
    setQuantities({ ...quantities, [product.id]: newQuantity });
    dispatch(addToCart({ ...product, quantity: newQuantity }));
  };

  const handleIncrease = (product) => {
    const currentQuantity = quantities[product.id] || 0;
    const newQuantity = currentQuantity + 1;
    setQuantities({ ...quantities, [product.id]: newQuantity });
    dispatch(addToCart({ ...product, quantity: newQuantity }));
  };

  const handleDecrease = (product) => {
    const currentQuantity = quantities[product.id] || 0;
    if (currentQuantity > 0) {
      const newQuantity = currentQuantity - 1;
      setQuantities({ ...quantities, [product.id]: newQuantity });
      dispatch(addToCart({ ...product, quantity: newQuantity }));
    }
  };

  useEffect(() => {
    if (user) {
      axiosClient
        .get("/smartphones")
        .then((response) => {
          setData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex gap-4 mt-28 flex-col">
      <div className="grid mx-auto w-[900px] grid-cols-1 lg:grid-cols-2 gap-4">
        {data.map((item) => {
          const quantity = quantities[item.id] || 0;

          return (
            <div
              key={item.id}
              className="card card-compact bg-base-100 w-96 shadow-xl"
            >
              <figure>
                <img
                  src={item.image}
                  alt={item.model}
                  className="w-full h-96 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-bold">Brand: {item.brand}</h2>
                <p className="text-lg font-bold">{item.model}</p>
                <p className="text-lg font-bold">{item.price}$</p>
                <div className="card-actions justify-end">
                  {quantity === 0 ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center">
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <span className="mx-2">{quantity}</span>
                      <button
                        className="bg-green-500 text-white py-1 px-3 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Store;
