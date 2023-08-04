import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the stored authentication data (e.g., access token) from localStorage
    localStorage.removeItem("accessToken");

    navigate("/SignIn");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
