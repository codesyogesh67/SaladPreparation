import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, CircularProgress, Box, Typography } from '@mui/material'
import "./Dashboard.css"
import { useSelector, useDispatch } from 'react-redux';
import { selectPrepareStatus,prepareStatus, selectNewData,postData, selectId } from '../features/dataSlice';
import { db } from '../firebase';

function CircularProgressWithLabel(props) {
    return (
        <Box>
            <CircularProgress size={168} variant="determinate" {...props} />
            <Box sx={{position: 'relative'}}>
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}


function SuccessPage() {
    const navigate = useNavigate()
    const [success,setSuccess] = useState(false)
    const [progress, setProgress] = useState(0);
    const prepareStatus = useSelector(selectPrepareStatus)
    const [orderStatus,setOrderStatus] = useState(false)
    const dispatch = useDispatch()
    const id = useSelector(selectId)
 

    useEffect(() => {
     
        db.collection("forms").onSnapshot(snapshot => snapshot.docs.filter(each =>{
            if(each.data().id === id){
               
                setOrderStatus(each.data().orderStatus)
              
            }
        }))
    },[])

   
    useEffect(() => {
        if(orderStatus){
            if(!success){
                const timer = setInterval(() => {
                    setProgress((prevProgress) =>prevProgress >=100 ? setSuccess(true) : prevProgress +3)
                }, 1000);
        
                return () => {
                    clearInterval(timer);
                };
               }
        }  
    }, [orderStatus]);
   

     


    return (
        <div className="successPage__container">
            
         
            <div className="successPage">
                { !success && (
                    <>
 {progress < 100 && (
    <CircularProgressWithLabel value={progress} />
 )}


    </>

    )}
    {!success && (
orderStatus ?  <p>Preparing...</p> : <p>On HOLD</p>
    ) }
   
    
    {progress === 100 ? (<p>Done. It's ready.</p>) : (<p>
        {prepareStatus}Thank you for your patience.</p>)}
            
                
            <Button onClick={() => navigate("/")}>Back to Home page</Button>
            </div>
        </div>
    )
}

export default SuccessPage
