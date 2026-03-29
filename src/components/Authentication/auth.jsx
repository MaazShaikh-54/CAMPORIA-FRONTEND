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
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        {isSignup && (
          <>
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>
        )}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <p onClick={() => setIsSignup(!isSignup)}>
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </p>
    </>
  );
};


Auth.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default Auth;