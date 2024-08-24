import { useRef } from "react";
import { login } from "../features/userSlice";
import { Link } from "react-router-dom";
import { axiosClient } from "../utils/axiosClients";
import { useDispatch } from "react-redux";

const Login = () => {
  const loginRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosClient.post("/auth/login", {
        username: loginRef.current.value,
        password: passwordRef.current.value,
      });
      console.log("Login Response Data:", response);

      dispatch(login(response.data));
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              ref={loginRef}
              id="username"
              className="input input-bordered w-full"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
        <div className="text-center mt-4">
          <Link to="/register" className="text-blue-600 hover:underline">You haven't got an account yet?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
