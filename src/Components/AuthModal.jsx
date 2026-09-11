import { useState } from "react";
import { FiX } from "react-icons/fi";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase";
import logo from "../assests/airbnblogo.png";
function AuthModal({ onClose, onAuthSuccess }) {
  const [mode, setMode] = useState("initial");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Continue from Airbnb-style first screen
  const handleEmailContinue = (e) => {
    e.preventDefault();

    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setMode("password");
  };
const handleGoogleLogin = async () => {
  setError("");
  setLoading(true);

  try {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    console.log("Google user:", result.user);

    alert("Logged in with Google successfully!");

    onClose();
  } catch (error) {
    console.error("Google login error:", error);

    if (error.code === "auth/popup-closed-by-user") {
      setError("Google login was cancelled.");
    } else if (error.code === "auth/popup-blocked") {
      setError("Please allow popups for Google login.");
    } else {
      setError("Google login failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};
  // Firebase login/signup
const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    if (mode === "signup") {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account created successfully!");

      if (onAuthSuccess) {
        onAuthSuccess();
      }

      onClose();
    } else {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Logged in successfully!");

      if (onAuthSuccess) {
        onAuthSuccess();
      }

      onClose();
    }
  } catch (error) {
    console.log(error);

    if (error.code === "auth/email-already-in-use") {
      setError("This email is already registered.");
    } else if (error.code === "auth/invalid-email") {
      setError("Please enter a valid email.");
    } else if (error.code === "auth/weak-password") {
      setError("Password should be at least 6 characters.");
    } else if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      setError("Invalid email or password.");
    } else {
      setError("Something went wrong. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 px-4">

      {/* MODAL */}
 <div 
  className=" 
    auth-modal-scroll
    relative 
    w-full 
    max-w-[520px] 
    max-h-[90vh] 
    overflow-y-auto 
    overflow-x-hidden
    rounded-[28px] 
    bg-white 
    shadow-[0_8px_30px_rgba(0,0,0,0.25)] 
  " 
>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="
            absolute
            left-5
            top-5
            z-10
            flex
            h-[40px]
            w-[40px]
            items-center
            justify-center
            rounded-full
            text-[#222]
            hover:bg-[#f5f5f5]
          "
        >
          <FiX size={22} />
        </button>


        {/* INITIAL AIRBNB SCREEN */}

        {mode === "initial" && (
          <div className="px-6 pb-7 pt-12">

            {/* AIRBNB LOGO */}

            <div className="mb-7 flex justify-center">
              <img
                src={logo}
                alt="Airbnb"
                className="h-[52px] w-[52px] object-contain"
              />
            </div>


            {/* TITLE */}

            <h2
              className="
                mb-9
                text-center
                text-[30px]
                font-semibold
                tracking-[-0.8px]
                text-[#222]
              "
            >
              Log in or sign up
            </h2>


            {/* EMAIL FORM */}

            <form onSubmit={handleEmailContinue}>

              <input
                type="email"
                placeholder="Phone number or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  h-[62px]
                  w-full
                  rounded-[12px]
                  border
                  border-[#8c8c8c]
                  px-5
                  text-[17px]
                  text-[#222]
                  outline-none
                  placeholder:text-[#717171]
                  focus:border-[2px]
                  focus:border-black
                "
              />


              {/* ERROR */}

              {error && (
                <p className="mt-3 text-[14px] font-medium text-red-600">
                  {error}
                </p>
              )}


              {/* CONTINUE */}

              <button
                type="submit"
                className="
                  mt-5
                  h-[62px]
                  w-full
                  rounded-[12px]
                  bg-[#E61E4D]
                  text-[17px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#D41142]
                "
              >
                Continue
              </button>

            </form>


            {/* OR */}

            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-[#dddddd]" />

              <span className="text-[15px] text-[#222]">
                or
              </span>

              <div className="h-px flex-1 bg-[#dddddd]" />

            </div>


            {/* GOOGLE */}

            <button
            
              type="button"
              onClick={handleGoogleLogin}
              className="
                flex
                h-[58px]
                w-full
                items-center
                justify-center
                gap-3
                rounded-[10px]
                border
                border-[#222]
                text-[16px]
                font-semibold
                text-[#222]
                transition
                hover:bg-[#f7f7f7]
              "
            >

              <span className="text-[21px] font-bold">
                G
              </span>

              Continue with Google

            </button>


            {/* APPLE */}

            <button
              type="button"
              className="
                mt-3
                flex
                h-[58px]
                w-full
                items-center
                justify-center
                gap-3
                rounded-[10px]
                border
                border-[#222]
                text-[16px]
                font-semibold
                text-[#222]
                transition
                hover:bg-[#f7f7f7]
              "
            >

              <span className="text-[22px]">
                
              </span>

              Continue with Apple

            </button>

          </div>
        )}


        {/* PASSWORD SCREEN */}

        {mode === "password" && (
          <div className="px-8 pb-10 pt-16 sm:px-10">

            <h2
              className="
                mb-2
                text-[28px]
                font-semibold
                tracking-[-0.5px]
                text-[#222]
              "
            >
              Welcome
            </h2>

            <p className="mb-7 text-[15px] text-[#717171]">
              Continue with <span className="font-semibold">{email}</span>
            </p>


            <form onSubmit={handleSubmit}>

              {/* PASSWORD */}

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="
                  h-[62px]
                  w-full
                  rounded-[12px]
                  border
                  border-[#8c8c8c]
                  px-5
                  text-[17px]
                  outline-none
                  focus:border-[2px]
                  focus:border-black
                "
              />


              {/* ERROR */}

              {error && (
                <p className="mt-3 text-[14px] font-medium text-red-600">
                  {error}
                </p>
              )}


              {/* CONTINUE */}

              <button
                type="submit"
                disabled={loading}
                className="
                  mt-5
                  h-[62px]
                  w-full
                  rounded-[12px]
                  bg-[#E61E4D]
                  text-[17px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#D41142]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? "Please wait..." : "Continue"}
              </button>

            </form>


            {/* BACK */}

            <button
              onClick={() => {
                setError("");
                setPassword("");
                setMode("initial");
              }}
              className="
                mt-6
                w-full
                text-center
                text-[14px]
                font-semibold
                underline
              "
            >
              Back
            </button>


            {/* LOGIN / SIGNUP */}

            <div className="mt-5 text-center text-[14px] text-[#717171]">

              {mode === "password" && (
                <>
                  New to Airbnb?{" "}

                  <button
                    onClick={() => setMode("signup")}
                    className="font-semibold text-black underline"
                  >
                    Create an account
                  </button>
                </>
              )}

            </div>

          </div>
        )}


        {/* SIGNUP SCREEN */}

        {mode === "signup" && (
          <div className="px-8 pb-10 pt-16 sm:px-10">

            <h2
              className="
                mb-2
                text-[28px]
                font-semibold
                text-[#222]
              "
            >
              Create your account
            </h2>

            <p className="mb-7 text-[15px] text-[#717171]">
              You're creating an account with:
            </p>

            <form onSubmit={handleSubmit}>

              <input
                type="email"
                value={email}
                readOnly
                className="
                  h-[62px]
                  w-full
                  rounded-[12px]
                  border
                  border-[#8c8c8c]
                  bg-[#f7f7f7]
                  px-5
                  text-[16px]
                "
              />

              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="
                  mt-4
                  h-[62px]
                  w-full
                  rounded-[12px]
                  border
                  border-[#8c8c8c]
                  px-5
                  text-[16px]
                  outline-none
                  focus:border-[2px]
                  focus:border-black
                "
              />

              {error && (
                <p className="mt-3 text-[14px] font-medium text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="
                  mt-5
                  h-[62px]
                  w-full
                  rounded-[12px]
                  bg-[#E61E4D]
                  text-[17px]
                  font-semibold
                  text-white
                  disabled:opacity-60
                "
              >
                {loading ? "Creating account..." : "Create account"}
              </button>

            </form>


            <button
              onClick={() => {
                setError("");
                setPassword("");
                setMode("initial");
              }}
              className="
                mt-6
                w-full
                text-center
                text-[14px]
                font-semibold
                underline
              "
            >
              Back
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default AuthModal;