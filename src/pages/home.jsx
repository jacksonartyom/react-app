import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
