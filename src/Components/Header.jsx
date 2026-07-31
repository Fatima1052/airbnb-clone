import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import DetailSearchBar from "./DetailSearchBar";

function Header() {
  const location = useLocation();

  const isDetailPage = location.pathname.includes("/property");

  return (
    <>
      {isDetailPage ? (
        <DetailSearchBar />
      ) : (
        <div className="w-full bg-[#fafafa] pb-[35px] border-b-2 border-[#ebebeb] shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <Navbar />
          <SearchBar />
        </div>
      )}
    </>
  );
}

export default Header;