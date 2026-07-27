import "./Navbar.css";
import logo from "../assests/airbnblogo.png";
import all from  "../assests/all.jfif";
import home from "../assests/home.png";
import experience from "../assests/experiences.jpg";
import service from "../assests/services.jfif";

import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">


      <div className="navbar-left">
    <img src={logo} alt="Airbnb Logo" />
    airbnb
</div>


<div className="navbar-center">


<NavLink
  to="/"
  end
  className={({ isActive }) =>
    isActive ? "Category active" : "Category"
  }
>

  <img src={all} alt="All" />

  <p>All</p>

</NavLink>


<NavLink
  to="/homes"
  className={({ isActive }) =>
    isActive ? "Category active" : "Category"
  }
>

  <img src={home} alt="Homes" />

  <p>Homes</p>

</NavLink>



<NavLink
  to="/experiences"
  className={({ isActive }) =>
    isActive ? "Category active" : "Category"
  }
>

  <img src={experience} alt="Experiences" />

  <p>Experiences</p>

</NavLink>



<NavLink
  to="/services"
  className={({ isActive }) =>
    isActive ? "Category active" : "Category"
  }
>

  <img src={service} alt="Services" />

  <p>Services</p>

</NavLink>


</div>




      <div className="navbar-right">
        <p>Become a host</p>
        <button>🌐</button>
        <button>☰</button>
      </div>

    </header>
  );
}

export default Navbar;