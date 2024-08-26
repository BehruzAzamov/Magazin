import { FaRegCircleXmark } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../features/cartSlice';

const Cart = () => {
  const cartItems = useSelector(state => state.cart?.items || []);
  const dispatch = useDispatch();

  return (
    <div className="card w-full shadow-xl mt-16 my-4">
      <div className="card-body">
        <h2 className="card-title text-red-600 font-bold">Your Cart ({cartItems.length})</h2>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <div>
                <p className="text-large text-black font-bold">{item.name}</p>
                <div className="flex">
                  <p className="text-red-600 text-bold">{item.quantity}x</p>
                  <p className="text-amber-700">@ ${item.price}</p>
                  <p className="text-amber-900 font-bold">${item.price * item.quantity}</p>
                </div>
              </div>
              <FaRegCircleXmark
                className="cursor-pointer"
                onClick={() => dispatch(removeFromCart(item.id))}
              />
            </div>
          ))
        ) : (
          <p>No items in cart.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;