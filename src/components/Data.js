import React, { useEffect } from 'react'
import { Box, Typography, Button, IconButton } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { selectData, getSearchStatus, cancelSearchData, postData, postId } from '../features/dataSlice'
import CloseIcon from '@mui/icons-material/Close';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"


function Data() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const data = useSelector(selectData)
    const id = uuidv4()




    const handleSubmit = (e) => {
        e.preventDefault()


        data?.map(({ name, notes, selectedBase, selectedProtein, selectedAddIns,
            selectedCrispies, selectedSauces, selectedToppings }) => {
            db.collection("forms").add({
                id, name, selectedBase, selectedProtein, selectedAddIns, selectedSauces,
                selectedToppings, selectedCrispies, timestamp: serverTimestamp(),
                orderStatus: false

            }).then(() => {
                dispatch(postId(id))
                navigate(`/success/${name}`)
            })
        })



    }



    return (
        <div className="dashboard__data">

            {data?.map(({ name, notes, selectedBase, selectedProtein, selectedAddIns, selectedCrispies, selectedSauces, selectedToppings }) => {

                return (
                    <form onSubmit={handleSubmit}>
                        <Box className="dashboard__Databox" >


                            <div className="dashboard__dataCancel">
                                <IconButton onClick={() => dispatch(cancelSearchData())}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
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
                                {selectedToppings?.map((topping, index) => (
                                    <Typography key={index}>{topping}</Typography>
                                ))}

                            </Box>
                            <Box className="dashboard__category">
                                <Typography variant="h5">Crispies</Typography>
                                {selectedCrispies?.map((crispy, index) => (
                                    <Typography key={index}>{crispy}</Typography>
                                ))}

                            </Box>

                            <Box sx={{ m: 3, width: 100 }}>

                                <Button type="submit" variant="contained">

                                    Submit</Button>


                            </Box>


                        </Box>
                    </form>

                )
            })}


        </div >
    )
}

export default Data
