import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import "./Header.css";


function Header(){

    return(

        <div className="header-container">

            <Navbar />

            <SearchBar />

        </div>

    )

}


export default Header;