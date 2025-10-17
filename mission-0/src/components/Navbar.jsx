import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">My Company</div>
      <ul className="nav-links">
        <li>Menu1</li>
        <li>Menu2</li>
        <li>Menu3</li>
      </ul>
      <button className="login-btn">Login</button>
    </nav>
  );
}
