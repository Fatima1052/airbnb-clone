import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import UserMenu from "./Components/UserMenu";
import { useAuth } from "./AuthContext";
import { getProfile, saveProfile } from "./services/profile";
import logo from "./assests/airbnblogo.png";

function Profile() {
  const navigate = useNavigate();

  const {
    currentUser,
    isLoggedIn,
    authLoading,
    logout,
  } = useAuth();

  const [searchParams] = useSearchParams();

  // ALL HOOKS MUST COME BEFORE ANY EARLY RETURN

  const userName =
    currentUser?.displayName ||
    currentUser?.email?.split("@")[0] ||
    "Guest";

  const userInitial = userName.charAt(0).toUpperCase();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    name: userName,
    bio: "",
    location: "",
  });

  const [editName, setEditName] = useState(userName);
  const [editBio, setEditBio] = useState("");
  const [editLocation, setEditLocation] = useState("");

  const [profileLoading, setProfileLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
const [activeSection, setActiveSection] = useState(
    ["about", "trips", "connections"].includes(searchParams.get("tab"))
      ? searchParams.get("tab")
      : "about"
  );
  // LOAD PROFILE

  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser?.uid) {
        setProfileLoading(false);
        return;
      }

      try {
        const data = await getProfile(currentUser.uid);

        if (data) {
          setProfileData({
            name: data.name || userName,
            bio: data.bio || "",
            location: data.location || "",
          });

          setEditName(data.name || userName);
          setEditBio(data.bio || "");
          setEditLocation(data.location || "");
        }
      } catch (error) {
        console.error("Profile load error:", error);
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, [currentUser?.uid, userName]);

  // SAVE PROFILE

  const handleSaveProfile = async () => {
    if (!currentUser?.uid) return;

    setSavingProfile(true);

    try {
      const newProfileData = {
        name: editName.trim() || userName,
        bio: editBio.trim(),
        location: editLocation.trim(),
        email: currentUser.email || "",
      };

      await saveProfile(currentUser.uid, newProfileData);

      setProfileData({
        name: newProfileData.name,
        bio: newProfileData.bio,
        location: newProfileData.location,
      });

      setIsEditOpen(false);
    } catch (error) {
      console.error("Profile save error:", error);
    } finally {
      setSavingProfile(false);
    }
  };

  // LOGOUT

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Send visitors who aren't logged in to the home page. This has to happen in
  // an effect (not while rendering) and only once Firebase has finished
  // checking the session – otherwise refreshing this page always kicked you out.
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [authLoading, isLoggedIn, navigate]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-[16px] text-[#717171]">Loading your profile…</p>
      </div>
    );
  }

  if (!isLoggedIn || !currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">

      {/* PROFILE PAGE NAVBAR */}

      <header
        className="
          w-full
          h-[72px]
          sm:h-[80px]
          flex
          items-center
          justify-between
          px-5
          sm:px-8
          md:px-10
          border-b
          border-[#ebebeb]
          bg-white
        "
      >

        {/* AIRBNB LOGO */}

        <div
          className="
            flex
            items-center
            gap-1
            cursor-pointer
            text-[#ff385c]
            font-black
          "
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Airbnb Logo"
            className="
              w-[28px]
              sm:w-[32px]
              md:w-[36px]
              lg:w-[40px]
            "
          />

          <span
            className="
              text-[25px]
              font-semibold
              tracking-[-1px]
              text-[#FF385C]
            "
          >
            airbnb
          </span>
        </div>


        {/* RIGHT SIDE */}

        <UserMenu />

      </header>


      {/* PROFILE CONTENT */}

      <main className="max-w-[1120px] mx-auto px-6 sm:px-8 py-10 sm:py-14">

        {/* HEADING */}

        <h1
          className="
            text-[32px]
            sm:text-[40px]
            font-semibold
            text-[#222222]
            mb-10
          "
        >
          Profile
        </h1>


        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-[220px_1fr]
            gap-10
            md:gap-16
          "
        >

         <aside>
  <button
    onClick={() => setActiveSection("about")}
    className={`w-full text-left px-4 py-3 rounded-xl font-semibold ${
      activeSection === "about"
        ? "bg-[#f7f7f7] text-[#222222]"
        : "text-[#222222] hover:bg-[#f7f7f7]"
    }`}
  >
    About me
  </button>

  <button
    onClick={() => setActiveSection("trips")}
    className={`w-full text-left px-4 py-3 mt-1 rounded-xl font-semibold ${
      activeSection === "trips"
        ? "bg-[#f7f7f7] text-[#222222]"
        : "text-[#222222] hover:bg-[#f7f7f7]"
    }`}
  >
    Past trips
  </button>

  <button
    onClick={() => setActiveSection("connections")}
    className={`w-full text-left px-4 py-3 mt-1 rounded-xl font-semibold ${
      activeSection === "connections"
        ? "bg-[#f7f7f7] text-[#222222]"
        : "text-[#222222] hover:bg-[#f7f7f7]"
    }`}
  >
    Connections
  </button>
</aside>

          {/* MAIN PROFILE */}

          <section>
{activeSection === "about" && (
  <>
            <div className="flex items-center justify-between mb-7">

              <h2
                className="
                  text-[25px]
                  sm:text-[28px]
                  font-semibold
                  text-[#222222]
                "
              >
                About me
              </h2>

              <button
                onClick={() => setIsEditOpen(true)}
                className="
                  px-5
                  py-2
                  rounded-lg
                  border
                  border-[#222222]
                  text-[14px]
                  font-semibold
                  hover:bg-[#f7f7f7]
                "
              >
                Edit
              </button>

            </div>


            {/* USER CARD */}

            <div
              className="
                border
                border-[#dddddd]
                rounded-2xl
                p-7
                sm:p-8
              "
            >

              <div className="flex items-start gap-5">

                {/* USER INITIAL */}

                <div
                  className="
                    flex
                    h-[72px]
                    w-[72px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#f7e8dc]
                    text-[28px]
                    font-semibold
                    text-[#222222]
                  "
                >
                  {userInitial}
                </div>


                {/* USER INFORMATION */}

                <div>

                  <h3
                    className="
                      text-[22px]
                      font-semibold
                      text-[#222222]
                    "
                  >
                    {profileLoading ? "Loading..." : profileData.name}
                  </h3>

                  <p className="mt-1 text-[#717171]">
                    Guest
                  </p>

                  {profileData.location && (
                    <p className="mt-2 text-[14px] text-[#717171]">
                      {profileData.location}
                    </p>
                  )}

                  {profileData.bio && (
                    <p className="mt-3 max-w-[500px] text-[15px] leading-6 text-[#717171]">
                      {profileData.bio}
                    </p>
                  )}

                  {currentUser.email && (
                    <p className="mt-3 text-[14px] text-[#717171]">
                      {currentUser.email}
                    </p>
                  )}

                </div>

              </div>

            </div>


            {/* COMPLETE PROFILE */}

            <div className="mt-10">

              <h2
                className="
                  text-[24px]
                  font-semibold
                  text-[#222222]
                "
              >
                Complete your profile
              </h2>

              <p
                className="
                  mt-2
                  text-[16px]
                  text-[#717171]
                "
              >
                Your profile helps hosts and guests get to know you.
              </p>

              <button
                onClick={() => setIsEditOpen(true)}
                className="
                  mt-5
                  rounded-lg
                  bg-[#222222]
                  px-5
                  py-3
                  text-white
                  font-semibold
                  hover:bg-black
                "
              >
                Get started
              </button>

            </div>


            {/* REVIEWS */}

            <div
              className="
                mt-10
                border-t
                border-[#dddddd]
                pt-8
              "
            >

              <h2
                className="
                  text-[20px]
                  font-semibold
                  text-[#222222]
                "
              >
                Show reviews I've written
              </h2>

            </div>


            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              className="
                mt-8
                text-[15px]
                font-semibold
                underline
                text-[#222222]
              "
            >
              Log out
            </button>

 </>
)}
{activeSection === "trips" && (
  <div>
    <h2 className="text-[28px] font-semibold text-[#222222]">
      Past trips
    </h2>

    <div className="mt-8 rounded-2xl border border-[#dddddd] p-8">
      <h3 className="text-[20px] font-semibold text-[#222222]">
        No trips yet
      </h3>

      <p className="mt-2 text-[15px] text-[#717171]">
        When you book a stay, your past trips will appear here.
      </p>

      <button
        onClick={() => navigate("/homes")}
        className="mt-6 rounded-lg bg-[#222222] px-5 py-3 text-[15px] font-semibold text-white hover:bg-black"
      >
        Start exploring
      </button>
    </div>
  </div>
)}

{activeSection === "connections" && (
  <div>
    <h2 className="text-[28px] font-semibold text-[#222222]">
      Connections
    </h2>

    <div className="mt-8 rounded-2xl border border-[#dddddd] p-8">
      <h3 className="text-[20px] font-semibold text-[#222222]">
        Your connections
      </h3>

      <p className="mt-2 text-[15px] text-[#717171]">
        Your Airbnb connections will appear here.
      </p>
    </div>
  </div>
)}
                  </section>
        </div>
      </main>


      {/* EDIT PROFILE MODAL */}

      {isEditOpen && (
        <div
          className="
            fixed
            inset-0
            z-[2000]
            flex
            items-center
            justify-center
            bg-black/40
            px-4
          "
        >

          <div
            className="
              w-full
              max-w-[520px]
              rounded-2xl
              bg-white
              p-6
              sm:p-8
              shadow-[0_10px_40px_rgba(0,0,0,0.25)]
            "
          >

            {/* MODAL HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-[#dddddd]
                pb-5
              "
            >

              <h2
                className="
                  text-[22px]
                  font-semibold
                  text-[#222222]
                "
              >
                Edit profile
              </h2>

              <button
                onClick={() => setIsEditOpen(false)}
                className="
                  flex
                  h-[36px]
                  w-[36px]
                  items-center
                  justify-center
                  rounded-full
                  text-[22px]
                  hover:bg-[#f5f5f5]
                "
              >
                ×
              </button>

            </div>


            {/* FORM */}

            <div className="mt-6 space-y-5">

              {/* NAME */}

              <div>

                <label
                  className="
                    text-[14px]
                    font-semibold
                    text-[#222222]
                  "
                >
                  Name
                </label>

                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="
                    mt-2
                    w-full
                    rounded-lg
                    border
                    border-[#b0b0b0]
                    px-4
                    py-3
                    text-[16px]
                    outline-none
                    focus:border-[#222222]
                  "
                />

              </div>


              {/* BIO */}

              <div>

                <label
                  className="
                    text-[14px]
                    font-semibold
                    text-[#222222]
                  "
                >
                  About me
                </label>

                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={4}
                  placeholder="Tell us a little about yourself"
                  className="
                    mt-2
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-[#b0b0b0]
                    px-4
                    py-3
                    text-[16px]
                    outline-none
                    focus:border-[#222222]
                  "
                />

              </div>


              {/* LOCATION */}

              <div>

                <label
                  className="
                    text-[14px]
                    font-semibold
                    text-[#222222]
                  "
                >
                  Location
                </label>

                <input
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  placeholder="Where do you live?"
                  className="
                    mt-2
                    w-full
                    rounded-lg
                    border
                    border-[#b0b0b0]
                    px-4
                    py-3
                    text-[16px]
                    outline-none
                    focus:border-[#222222]
                  "
                />

              </div>

            </div>


            {/* SAVE */}

            <div className="mt-7 flex justify-end">

              <button
                onClick={handleSaveProfile}
                disabled={savingProfile}
                className="
                  rounded-lg
                  bg-[#222222]
                  px-6
                  py-3
                  text-[15px]
                  font-semibold
                  text-white
                  hover:bg-black
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {savingProfile ? "Saving..." : "Save"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Profile;