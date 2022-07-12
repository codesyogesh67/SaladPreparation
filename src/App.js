import './App.css';
import Form from './components/Form';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SuccessPage from './components/SuccessPage';
import Login from './components/Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from './features/authSlice';


function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login(authUser))
      }
    })
  }, [])



  return (


    <div className="app">
      <Routes>
        <Route exact path="/" element={<Form />} />
        <Route path="/dashboard" element={user !== null ? <Dashboard /> : <Login />} />


        <Route path="/login" element={<Login />} />

        <Route path="/success/:handle" element={<SuccessPage />} />



      </Routes>

    </div>

  )

}

export default App;
