import { Menu, Dropdown, Button, Avatar, Badge } from "antd";
import { HomeOutlined, ShoppingCartOutlined, LogoutOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";

function Navbar() {
  const cartItems = useSelector(state => state.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const username = user.username.toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); 
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        className="text-red-600 font-bold"
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="top-nav gap-10 flex justify-center fixed top-0 left-0 right-0 w-full mx-auto p-0 bg-white shadow-lg z-50">
      <NavLink to="/" className="p-4">
        <Button type="text" icon={<HomeOutlined />} />
      </NavLink>
      <NavLink to="/cart" className="p-4">
        <Badge count={cartItems.length} offset={[10, 0]}>
          <Button type="text" icon={<ShoppingCartOutlined />} />
        </Badge>
      </NavLink>
      <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
        <Avatar
          size="large"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          style={{ cursor: 'pointer' }}
        />
      </Dropdown>
      <div className="p-4">
        {username} your role {user.type}
      </div>
    </div>
  );
}

export default Navbar;
