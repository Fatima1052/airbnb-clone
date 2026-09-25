import { useState } from "react";
import { FiX } from "react-icons/fi";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { z } from "zod";

import { auth } from "../firebase";
import logo from "../assests/airbnblogo.png";

// -----------------------------
// ZOD VALIDATION
// -----------------------------

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters."),
});

const signupSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .email("Please enter a valid email address."),

    password: z
      .string()
      .min(1, "Password is required.")
      .min(6, "Password must be at least 6 characters."),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

function AuthModal({ onClose, onAuthSuccess }) {
  // Signup is the first screen
  const [mode, setMode] = useState("signup");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // CLEAR FORM
  // -----------------------------

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  // -----------------------------
  // LOGIN
  // -----------------------------

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    // ZOD VALIDATION FIRST
    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      if (onAuthSuccess) {
        onAuthSuccess();
      }

      onClose();
    } catch (error) {
      console.error("Login error:", error);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError("Invalid email or password.");
      } else if (error.code === "auth/too-many-requests") {
        setError(
          "Too many unsuccessful attempts. Please try again later."
        );
      } else if (error.code === "auth/network-request-failed") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Unable to log in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // SIGNUP
  // -----------------------------

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    // ZOD VALIDATION FIRST
    const result = signupSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      if (onAuthSuccess) {
        onAuthSuccess();
      }

      onClose();
    } catch (error) {
      console.error("Signup error:", error);

      if (error.code === "auth/email-already-in-use") {
        setError(
          "This email is already registered. Please log in instead."
        );
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else if (error.code === "auth/network-request-failed") {
        setError("Network error. Please check your internet connection.");
      } else {
        setError("Unable to create your account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // GOOGLE LOGIN / SIGNUP
  // -----------------------------

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      console.log("Google user:", result.user);

      if (onAuthSuccess) {
        onAuthSuccess();
      }

      onClose();
    } catch (error) {
      console.error("Google login error:", error);

      if (error.code === "auth/popup-closed-by-user") {
        setError("Google sign in was cancelled.");
      } else if (error.code === "auth/popup-blocked") {
        setError("Please allow popups for Google sign in.");
      } else {
        setError("Google sign in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 px-4">

      {/* MODAL */}
      <div
        className="
          relative
          w-full
          max-w-[500px]
          max-h-[90vh]
          overflow-y-auto
          rounded-[24px]
          bg-white
          shadow-[0_8px_30px_rgba(0,0,0,0.25)]
        "
      >

        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            left-5
            top-5
            z-10
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            text-[#222]
            transition
            hover:bg-[#f5f5f5]
          "
          aria-label="Close"
        >
          <FiX size={22} />
        </button>

        {/* =========================
            SIGNUP SCREEN
        ========================= */}

        {mode === "signup" && (
          <div className="px-7 pb-8 pt-14 sm:px-9">

            {/* LOGO */}
            <div className="mb-5 flex justify-center">
              <img
                src={logo}
                alt="Airbnb"
                className="h-[48px] w-[48px] object-contain"
              />
            </div>

            {/* TITLE */}
            <h2
              className="
                mb-2
                text-center
                text-[28px]
                font-semibold
                tracking-[-0.6px]
                text-[#222]
              "
            >
              Create your account
            </h2>

            <p className="mb-7 text-center text-[15px] text-[#717171]">
              Sign up to start your Airbnb journey
            </p>

            <form onSubmit={handleSignup}>

              {/* EMAIL */}
              <label className="mb-2 block text-[14px] font-semibold text-[#222]">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  h-[58px]
                  w-full
                  rounded-[10px]
                  border
                  border-[#8c8c8c]
                  px-4
                  text-[16px]
                  text-[#222]
                  outline-none
                  placeholder:text-[#717171]
                  focus:border-2
                  focus:border-black
                "
              />

              {/* PASSWORD */}
              <label className="mb-2 mt-4 block text-[14px] font-semibold text-[#222]">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  h-[58px]
                  w-full
                  rounded-[10px]
                  border
                  border-[#8c8c8c]
                  px-4
                  text-[16px]
                  text-[#222]
                  outline-none
                  placeholder:text-[#717171]
                  focus:border-2
                  focus:border-black
                "
              />

              {/* CONFIRM PASSWORD */}
              <label className="mb-2 mt-4 block text-[14px] font-semibold text-[#222]">
                Confirm password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="
                  h-[58px]
                  w-full
                  rounded-[10px]
                  border
                  border-[#8c8c8c]
                  px-4
                  text-[16px]
                  text-[#222]
                  outline-none
                  placeholder:text-[#717171]
                  focus:border-2
                  focus:border-black
                "
              />

              {/* ERROR */}
              {error && (
                <div
                  className="
                    mt-3
                    rounded-lg
                    bg-[#fff1f2]
                    px-3
                    py-2
                    text-[14px]
                    font-medium
                    text-[#c13515]
                  "
                >
                  {error}
                </div>
              )}

              {/* SIGNUP BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="
                  mt-5
                  h-[58px]
                  w-full
                  rounded-[10px]
                  bg-[#E61E4D]
                  text-[16px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#D41142]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? "Creating account..." : "Create account"}
              </button>

            </form>

            {/* DIVIDER */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#dddddd]" />
              <span className="text-[14px] text-[#717171]">
                or
              </span>
              <div className="h-px flex-1 bg-[#dddddd]" />
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="
                flex
                h-[56px]
                w-full
                items-center
                justify-center
                gap-3
                rounded-[10px]
                border
                border-[#222]
                text-[15px]
                font-semibold
                text-[#222]
                transition
                hover:bg-[#f7f7f7]
                disabled:opacity-60
              "
            >
              <span className="text-[20px] font-bold">
                G
              </span>

              Continue with Google
            </button>

            {/* LOGIN LINK */}
            <div className="mt-7 text-center text-[14px] text-[#717171]">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="font-semibold text-black underline"
              >
                Log in
              </button>
            </div>

          </div>
        )}

        {/* =========================
            LOGIN SCREEN
        ========================= */}

        {mode === "login" && (
          <div className="px-7 pb-8 pt-14 sm:px-9">

            {/* LOGO */}
            <div className="mb-5 flex justify-center">
              <img
                src={logo}
                alt="Airbnb"
                className="h-[48px] w-[48px] object-contain"
              />
            </div>

            {/* TITLE */}
            <h2
              className="
                mb-2
                text-center
                text-[28px]
                font-semibold
                tracking-[-0.6px]
                text-[#222]
              "
            >
              Log in
            </h2>

            <p className="mb-7 text-center text-[15px] text-[#717171]">
              Welcome back to Airbnb
            </p>

            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <label className="mb-2 block text-[14px] font-semibold text-[#222]">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  h-[58px]
                  w-full
                  rounded-[10px]
                  border
                  border-[#8c8c8c]
                  px-4
                  text-[16px]
                  text-[#222]
                  outline-none
                  placeholder:text-[#717171]
                  focus:border-2
                  focus:border-black
                "
              />

              {/* PASSWORD */}
              <label className="mb-2 mt-4 block text-[14px] font-semibold text-[#222]">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  h-[58px]
                  w-full
                  rounded-[10px]
                  border
                  border-[#8c8c8c]
                  px-4
                  text-[16px]
                  text-[#222]
                  outline-none
                  placeholder:text-[#717171]
                  focus:border-2
                  focus:border-black
                "
              />

              {/* ERROR */}
              {error && (
                <div
                  className="
                    mt-3
                    rounded-lg
                    bg-[#fff1f2]
                    px-3
                    py-2
                    text-[14px]
                    font-medium
                    text-[#c13515]
                  "
                >
                  {error}
                </div>
              )}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="
                  mt-5
                  h-[58px]
                  w-full
                  rounded-[10px]
                  bg-[#E61E4D]
                  text-[16px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#D41142]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? "Logging in..." : "Log in"}
              </button>

            </form>

            {/* DIVIDER */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#dddddd]" />
              <span className="text-[14px] text-[#717171]">
                or
              </span>
              <div className="h-px flex-1 bg-[#dddddd]" />
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="
                flex
                h-[56px]
                w-full
                items-center
                justify-center
                gap-3
                rounded-[10px]
                border
                border-[#222]
                text-[15px]
                font-semibold
                text-[#222]
                transition
                hover:bg-[#f7f7f7]
                disabled:opacity-60
              "
            >
              <span className="text-[20px] font-bold">
                G
              </span>

              Continue with Google
            </button>

            {/* SIGNUP LINK */}
            <div className="mt-7 text-center text-[14px] text-[#717171]">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className="font-semibold text-black underline"
              >
                Sign up
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default AuthModal;