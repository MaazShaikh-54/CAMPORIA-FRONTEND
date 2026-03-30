import { useState } from 'react';
import { loginUser, registerUser } from '../../utils/services/authservice';
import PropTypes from "prop-types";

const Auth = ({ onSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        await registerUser({ name, email, password });
        alert("Signup successful");
        onSuccess();
      } else {
        const res = await loginUser({ email, password });
        localStorage.setItem("token", res.data.token);
        alert("Login successful");
        onSuccess();
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
            <>Don't have an account? <span>Sign Up</span></>
          )}
        </p>
      </div>
    </>
  );
};


Auth.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default Auth;