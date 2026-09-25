import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[520px] flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-[64px] font-semibold leading-none text-[#FF385C]">
        404
      </p>

      <h1 className="mt-4 text-[26px] font-semibold text-[#222222]">
        We can't find that page
      </h1>

      <p className="mt-2 text-[16px] text-[#6a6a6a]">
        The link may be broken or the stay may have been removed.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-[10px] bg-[#222222] px-6 py-3 text-[15px] font-semibold text-white hover:bg-black"
      >
        Back to home
      </Link>
    </div>
  );
}

export default NotFound;
