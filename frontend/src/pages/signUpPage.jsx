import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

// ─── Password strength helper ──────────────────────────────────────────────
function getPasswordStrength(pwd) {
  if (!pwd) return { label: "", level: 0 };
  const hasUpper = /[A-Z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
  const long = pwd.length >= 10;
  const medium = pwd.length >= 6;

  if (long && hasUpper && hasNumber && hasSpecial) return { label: "Strong", level: 3 };
  if (medium && (hasUpper || hasNumber)) return { label: "Medium", level: 2 };
  return { label: "Weak", level: 1 };
}

const strengthColors = {
  1: "bg-red-500",
  2: "bg-amber-400",
  3: "bg-emerald-400",
};
const strengthTextColors = {
  1: "text-red-400",
  2: "text-amber-400",
  3: "text-emerald-400",
};

// ─── Reusable icon input wrapper ───────────────────────────────────────────
function InputField({ icon: Icon, label, id, rightElement, children, labelRight }) {
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="flex justify-between items-center text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] mb-2 group-focus-within:text-amber-400 transition-colors duration-300"
      >
        <span>{label}</span>
        {labelRight && <span>{labelRight}</span>}
      </label>
      <div className="relative flex items-center">
        {Icon && (
          <Icon
            size={15}
            className="absolute left-4 text-gray-500 group-focus-within:text-amber-400 transition-colors duration-300 pointer-events-none"
          />
        )}
        {children}
        {rightElement && (
          <span className="absolute right-3 flex items-center">{rightElement}</span>
        )}
      </div>
    </div>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────
export default function SignUpPage() {
  // ── Existing state (DO NOT change) ──
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // ── UI-only state (no backend impact) ──
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = getPasswordStrength(password);

  // ── Existing registration logic (DO NOT change) ──
  function handleRegister() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    axios
      .post(import.meta.env.VITE_API_URL + "/users/", {
        firstName,
        lastName,
        email,
        password,
      })
      .then(() => {
        toast.success("Registered successfully!");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // ── Shared input class ──
  const inputCls =
    "w-full py-3.5 pl-11 pr-4 bg-black/40 text-white rounded-xl border border-white/10 " +
    "focus:border-amber-400/50 focus:bg-black/60 focus:outline-none focus:ring-2 " +
    "focus:ring-amber-400/20 transition-all duration-300 placeholder:text-gray-600 font-light text-sm";

  return (
    <div className="flex w-full min-h-screen bg-[#050505] text-white overflow-hidden font-sans">

      {/* ── Left hero panel – hidden on mobile ── */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden group">
        <img
          src="/premium-watch-bg.png"
          alt="Premium Veloura Watch"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20000ms] group-hover:scale-110 ease-out"
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent flex flex-col justify-end p-16 pb-24">
          <p className="mb-5 text-xs font-medium tracking-[0.4em] text-[#c9a96e] animate-fade-in-up">
            THE ART OF TIME
          </p>
          <h2
            className="text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-2xl animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            Join the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              Legacy.
            </span>
          </h2>
          <p
            className="mt-6 text-xl text-gray-300 font-light max-w-md animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Create your exclusive Veloura account and discover the world's
            finest timepieces.
          </p>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-6 py-12 bg-[#050505] relative overflow-hidden">
        {/* Ambient glow blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Card */}
        <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl px-8 py-10 z-10 animate-fade-in relative overflow-hidden">
          {/* Gloss highlight inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

          {/* Heading */}
          <h1 className="text-3xl font-bold mb-1 text-white tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-400 mb-8 text-sm font-light">
            Join the world of luxury timekeeping
          </p>

          <div className="space-y-5">

            {/* First Name + Last Name row */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* First Name */}
              <InputField icon={User} label="First Name" id="firstName">
                <input
                  id="firstName"
                  autoComplete="given-name"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  placeholder="John"
                  className={inputCls}
                />
              </InputField>

              {/* Last Name */}
              <InputField icon={User} label="Last Name" id="lastName">
                <input
                  id="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  placeholder="Doe"
                  className={inputCls}
                />
              </InputField>
            </div>

            {/* Email */}
            <InputField icon={Mail} label="Email" id="email">
              <input
                id="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="name@example.com"
                className={inputCls}
              />
            </InputField>

            {/* Password */}
            <div>
              <InputField
                icon={Lock}
                label="Password"
                id="password"
                rightElement={
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-gray-500 hover:text-amber-400 transition-colors duration-200 p-1"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
              >
                <input
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  className={`${inputCls} pr-10`}
                />
              </InputField>

              {/* Password strength bar */}
              {password.length > 0 && (
                <div className="mt-2.5 space-y-1">
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className={`h-1 flex-1 rounded-full transition-all duration-400 ${
                          passwordStrength.level >= n
                            ? strengthColors[passwordStrength.level]
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-[11px] font-medium transition-colors duration-300 ${
                      strengthTextColors[passwordStrength.level] ?? "text-gray-500"
                    }`}
                  >
                    {passwordStrength.label} password
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <InputField
              icon={ShieldCheck}
              label="Confirm Password"
              id="confirmPassword"
              rightElement={
                <button
                  type="button"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="text-gray-500 hover:text-amber-400 transition-colors duration-200 p-1"
                >
                  {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
            >
              <input
                id="confirmPassword"
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder="••••••••"
                type={showConfirmPassword ? "text" : "password"}
                className={`${inputCls} pr-10`}
              />
            </InputField>

            {/* Submit button */}
            <button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full py-4 mt-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500
                hover:from-amber-400 hover:via-amber-300 hover:to-amber-400
                text-black font-bold uppercase tracking-[0.1em] rounded-xl
                shadow-[0_4px_20px_rgba(245,158,11,0.2)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.4)]
                hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                flex items-center justify-center gap-2 text-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating Account…
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          {/* Login link */}
          <p className="mt-8 text-center text-sm text-gray-400 font-light">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-amber-400 font-medium hover:underline hover:text-amber-300 transition-colors duration-200 ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}