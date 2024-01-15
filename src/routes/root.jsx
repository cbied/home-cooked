import App from "../App";
import logo from '../assets/logo.png'

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <div className="nav-logo-name">
          <img src={logo} alt="food logo" className="nav-logo" />
          <h2>Home Cooked</h2>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`/contacts/1`}>Your Name</a>
            </li>
            <li>
              <a href={`/contacts/2`}>Your Friend</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <App />
      </div>
    </>
  );
}