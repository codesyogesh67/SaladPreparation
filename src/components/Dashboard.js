import React, { useState, useEffect } from 'react'
import "./Dashboard.css"
import { db, auth } from '../firebase'
import { Button, Box, Tab, Tabs, IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router';
import Row from './Row';
import TabPanel from './TabPanel';
import { useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';


function Dashboard() {
    const [orders, setOrders] = useState([])
    const [completedOrders, setCompletedOrders] = useState([])
    const [value, setValue] = useState(0)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        db.collection("forms").orderBy("timestamp", "desc").onSnapshot(snapshot => {

            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),

            })))
        })

        db.collection("completedOrders").orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setCompletedOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })

    }, [])



    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const signout = () => {
        auth.signOut()
        dispatch(logout())
        navigate("/login")
    }


    return (
        <div className="dashboard__container">
            <div className="dashboard">

                <div className="dashboard__links">
                    <Button onClick={() => navigate("/")}>Back to Form</Button>
                    <Tooltip title="Log out">
                        <IconButton onClick={signout}>
                            <LogoutIcon />
                        </IconButton>
                    </Tooltip>


                </div>

                <Box>
                    <Tabs value={value} onChange={handleChange} indicatorColor="secondary" textColor="secondary"
                        variant="fullWidth" centered>
                        <Tab label={"New Orders" + " " + `${orders.length > 0 ? ("(" + orders.length + ")") : ""}`} />


                        <Tab label="Completed Orders" />
                    </Tabs>

                </Box>
                <TabPanel value={value} index={0}>
                    {orders?.map(({ id, data }) => (

                        <Row key={id} data={data} id={id} status="new" />
                    ))}
                </TabPanel>
                <TabPanel value={value} index={1}>

                    {completedOrders?.map(({ id, data }) => (

                        <Row key={id} data={data} id={id} status="completed" />
                    ))}


                </TabPanel>




            </div>

        </div>
    )
}

export default Dashboard
