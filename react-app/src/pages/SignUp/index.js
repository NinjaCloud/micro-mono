import React, { useState } from 'react';

function SignUp() {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const insertDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${process.env.REACT_APP_REGISTER_URL}`, {
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
          setTimeout(() => {
            setLoading(false);
            window.location.href = '/login';
          }, 2000);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex-row justify-center h-full">
        <div className="flex justify-center col-12 col-md-6 border border-blue-500 h-full p-3 ">
          <form className="justify-center justify-space-between-md align-stretch">
            <div className="flex-row justify-center p-2">
              <input
                placeholder="Your email"
                name="email"
                type="email"
                className="form-input col-12 col-md-9 border border-dark p-2 rounded-md w-full"
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              />
            </div>
            <div className="flex-row justify-center p-2 ">
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
                  Register
                </button>
              )}
            </div>
            <div className="flex-row justify-center p-2">
              <p className="text-center">
                Already have an account?{' '}
                <a href="/login" className="text-center text-blue-500 underline">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
