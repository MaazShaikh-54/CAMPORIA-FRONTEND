import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { loginUser, registerUser } from '../../utils/services/authservice';
import PropTypes from "prop-types";

const Auth = ({ onSuccess, mode }) => {
  const [isSignup, setIsSignup] = useState(mode === "signup");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setIsSignup(mode === "signup");
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        await registerUser({ name, email, password });
        toast.success("Signup successful");
        onSuccess();
      } else {
        const res = await loginUser({ email, password });
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful");
        localStorage.setItem("token", res.data.token);
        onSuccess();
        window.location.reload();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <>
      <div className="auth-container">
        <h2 className=''>{isSignup ? "Create Account" : "Welcome Back"}</h2>

        <form onSubmit={handleSubmit} className="auth-form">

          {error && <p className="error">{error}</p>}

          {isSignup && (
            <div className="auth-field">
              <label>Name</label>
              <input
                type="text"
                value={name}
                placeholder='Enter full name'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder='Enter email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder='Enter password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="auth-submit" type="submit">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p
          className="auth-toggle-text"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? (
            <>Already have an account? <span>Login</span></>
          ) : (
            <>Don&apos;t have an account? <span>Sign Up</span></>
          )}
        </p>
      </div>
    </>
  );
};


Auth.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["login", "signup"]).isRequired,
};

export default Auth;