import React from 'react'
import { useState } from 'react'
import { request, setAuthHeader } from '../helpers/axios_helper';
import { useAuthDispatch} from '../context/authContext';
import { Link } from 'react-router-dom';

const Form = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [requestError, setRequestError] = useState("");

    const authDispath = useAuthDispatch();

    const onLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setRequestError("");

        let valid = true;

        if (username.trim() === "") {
            setUsernameError("Username cannot be empty");
            valid = false;
        } else {
            setUsernameError("");
        }

        if (password.trim() === "") {
            setPasswordError("Password cannot be empty");
            valid = false;
        } else {
            setPasswordError("");
        }

        if (!valid) {
            return;
        }

        try {
            const response = await request("POST", "/auth/login", {
                username: username,
                password: password
            });
            const token =response.data.token;
            authDispath({
                type: 'login',
                token
            })
            console.log("PASO");
        } catch (error) {
            setAuthHeader(null);
            setRequestError("Login failed. Please check your credentials and try again.");
            console.log("NO PASO");
        }
    };

  return (
    <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-100'>
        <h1 className='text-5xl font-semibold'>Welcome Back</h1>
        <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter your details.</p>
        <form className='mt-8' onSubmit={onLogin}>
            <div>
                <label className='text-lg font-medium'>Email</label>
                <input
                    value={username}
                    onChange={e=>{setusername(e.target.value)}}
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder='Enter your email'
                    type='text'
                />
                {usernameError && <p className='text-red-500 mt-2'>{usernameError}</p>}
            </div>
            <div>
                <label className='text-lg font-medium'>Password</label>
                <input
                    value={password}
                    onChange={e=>{setpassword(e.target.value)}}
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder='Enter your password'
                    type='password'
                />
                {passwordError && <p className='text-red-500 mt-2'>{passwordError}</p>}
            </div>
            <div className='mt-8 flex justify-between items-center'>
                <div>
                    <input
                        type='checkbox'
                        id='remember'
                    />
                    <label className='ml-2 font-medium text-base' htmlFor="remember">Remember for 30 days</label>
                </div>
                <button className='font-medium text-base text-violet-500'><Link to="/recovery">Forgot password</Link></button>
            </div>
            <div className='mt-8 flex flex-col gap-y-4'>
                <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 bg-violet-500 text-white text-lg font-bold'>Sign in</button>
                {requestError && <p className='text-red-500 mt-2'>{requestError}</p>}
            </div>
            <div className='mt-8 flex justify-center items-center'>
                <p className='font-medium text-base'><Link to="/register">Don't have an account?</Link></p>
                <button className='text-violet-500 text-base font-medium ml-2'><Link to="/register">Sign up</Link></button>
            </div>
        </form>
    </div>
  )
}

export default Form