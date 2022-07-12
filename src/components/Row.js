import React, { useState } from 'react'
import { db } from '../firebase';
import { Button, Collapse, Typography, Box } from '@mui/material';
import "./Dashboard.css"
import TimeAgo from "react-timeago"
import { useDispatch } from 'react-redux';
import { prepareStatus } from '../features/dataSlice';


function Row(props) {

    const { name, notes, timestamp, selectedCrispies, selectedBase, selectedAddIns, selectedProtein, selectedSauces, selectedToppings, orderStatus } = props.data;
    const [open, setOpen] = useState(false)
    const { id } = props;
    const dispatch = useDispatch()




    const orderCompleted = async () => {
        const docRef = db.collection("forms").doc(id)
        const orderRef = db.collection('completedOrders')
        const doc = await docRef.get()
        if (doc.exists) {
            orderRef.add({ ...doc.data(), orderStatus: false })
            setTimeout(docRef.delete(), 5000)
        }

    }

    const openOrder = () => {
        setOpen(!open)


        db.collection("forms").doc(id).update({
            orderStatus: true
        }).then(() => {

            dispatch(prepareStatus(true))
        })
    }

    const deleteOrder = async () => {

        const orderRef = db.collection("completedOrders")
        const snapshot = await orderRef.doc(id).delete()

    }

    return (
        <div className="dashboard__row">
            <Box className={orderStatus ? "dashboard__labelSeen dashboard__label" : "dashboard__label"} variant="outlined" onClick={openOrder}>
                <p>{name} </p>
                <TimeAgo date={timestamp.toDate()} minPeriod={20} />
            </Box>
            <Collapse sx={{ width: "100%" }} in={open} timeout="auto" unmountOnExit>
                <div className="dashboard__collapse">
                    <Box className="dashboard__box">


                        <Box className="dashboard__notes">
                            <Typography variant="h5">Additional Notes</Typography>
                            <Typography>{notes}</Typography>

                        </Box>

                        <Box className="dashboard__category">
                            <Typography variant="h5">Base</Typography>
                            <Typography>{selectedBase}</Typography>
                        </Box>
                        <Box className="dashboard__category">
                            <Typography variant="h5">Protein</Typography>
                            {selectedProtein?.map((protein, index) => (
                                <Typography key={index}>{protein}</Typography>
                            )

                            )}

                        </Box>

                        <Box className="dashboard__category">
                            <Typography variant="h5">Add Ins</Typography>
                            {selectedAddIns?.map((item, index) => (
                                <Typography key={index}>{item}</Typography>
                            ))}

                        </Box>
                        <Box className="dashboard__category">
                            <Typography variant="h5">Sauces</Typography>

                            <Typography>{selectedSauces}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5">Toppings</Typography>
                            {selectedToppings.map((topping, index) => (
                                <Typography key={index}>{topping}</Typography>
                            ))}

                        </Box>
                        <Box className="dashboard__category">
                            <Typography variant="h5">Crispies</Typography>
                            {selectedCrispies?.map((crispy, index) => (
                                <Typography key={index}>{crispy}</Typography>
                            ))}

                        </Box>
                        {orderStatus && (
                            <Button onClick={orderCompleted} variant="contained" color="success">
                                Done
                            </Button>
                        )}
                        {!orderStatus && (
                            <Button onClick={deleteOrder} variant="contained" color="success">
                                Delete
                            </Button>
                        )}






                    </Box>
                </div>
            </Collapse>

        </div>
    )

}

export default Row
