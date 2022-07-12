import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { login } from '../features/authSlice'
import { useDispatch } from 'react-redux'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()



    const handleSubmit = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            dispatch(login(auth))
            return navigate("/dashboard")
        }).catch(err => console.log(err))
    }
    return (
        <div className="dashboard__loginContainer">
            <div className="dashboard__login">
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input placeholder="password" value={password} type="password" onChange={e => setPassword(e.target.value)} />
                    <Button type="submit" variant="contained" sx={{ mt: 2, py: 1.5 }}>Login</Button>
                    <Button onClick={() => navigate("/")} sx={{ my: 2 }}>Go to Form</Button>

                </form>
            </div>

        </div>
    )
}

export default Login
