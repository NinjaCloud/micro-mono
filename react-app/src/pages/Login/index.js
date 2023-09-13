import React, { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';

function Login() {
  const [userDetails, setUserDetails] = useState({});
  const contextData = useContext(UserContext);
  const { userState, setUserState } = contextData;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const insertDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${process.env.REACT_APP_LOGIN_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userDetails.email,
          password: userDetails.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.token && data?.email) {
            localStorage.setItem('user', JSON.stringify(data?.email));
            localStorage.setItem('token', data.token);
            setUserState({ user: data?.email, token: data.token });
            window.location.href = '/';
          } else {
            setLoading(false);
            setError(data?.error);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex-row justify-center">
        <div className="flex justify-center col-12 col-md-6 border border-blue-500 p-3 ">
          <form className="justify-center justify-space-between-md align-stretch ">
            <div className="flex-row justify-center p-2">
              <input
                placeholder="Your email"
                name="email"
                type="email"
                className="form-input col-12 col-md-9 border border-dark p-2 rounded-md w-full"
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              />
            </div>
            <div className="flex-row justify-center p-2">
              <input
                placeholder="******"
                name="password"
                type="password"
                className="form-input col-12 col-md-9 border border-dark p-2 rounded-md justify-center w-full
              "
                onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              />
            </div>
            <div className="flex-row justify-center p-2">
              {loading ? (
                <div className="flex mx-auto items-center justify-center btn col-12 col-md-3 rounded-md bg-gray-500 w-full text-white py-2 cursor-wait">
                  Loading...
                </div>
              ) : (
                <button
                  className="btn col-12 col-md-3 rounded-md bg-cloudthat-blue w-full text-white py-2"
                  type="submit"
                  onClick={(e) => insertDetails(e)}
                >
                  Login
                </button>
              )}
            </div>
            {setError && (
              <div className="flex-row justify-center p-2">
                <p className="text-center text-red-500">{error}</p>
              </div>
            )}
            <div className="flex-row justify-center p-2">
              <p className="text-center">
                Don't have an account?{' '}
                <a href="/signup" className="text-center text-blue-500 underline">
                  Sign up here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
