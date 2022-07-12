import React, { useState, useMemo } from 'react'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router';
import { serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid"

import { Button, FormLabel, FormHelperText, TextField, IconButton } from '@mui/material';
import { selectUser } from '../features/authSlice';
import { selectData, postId } from '../features/dataSlice';
import { useSelector, useDispatch } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from './SearchBar';
import Data from './Data';
import MultipleSelect from './MultipleSelect';

const base = ["White Rice", "Brown Rice", "Kale", "Spinach", "Romaine", "Quinoa", "White Rice & Seaweed Burrito", "None"]
const protein = ["Tuna", "Salmon", "Yellow Tail", "Surimi", "Grilled Tuna"]
const addIns = ["Carrot", "Cucumber", "Avocado", "Sweet Corn", "Sweet Onions", "Edamame", "Diced Mango", "Scallions"]
const sauces = ["Ponzu", "Spicy Mayo", "Sweet Sauce"]
const toppings = ["Masago", "Ginger", "Wasabi", "None"]
const crispies = ["Dry Noodles", "Crispy Onions", "Waluts", "Cashews", "Raisons"]

function Form() {
    const [name, setName] = useState("")
    const [selectedBase, setSelectedBase] = useState("")
    const [selectedProtein, setSelectedProtein] = useState([])
    const [selectedAddIns, setSelectedAddIns] = useState([])
    const [selectedSauces, setSelectedSauces] = useState("")
    const [selectedToppings, setSelectedToppings] = useState([])
    const [selectedCrispies, setSelectedCrispies] = useState([])
    const [notes, setNotes] = useState("")
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const dataRetrieved = useSelector(selectData)


    const id = uuidv4()


    function MyFormHelperText() {

        const helperText = useMemo(() => {
            if (error) {
                return 'This field is required';
            }

            return '';
        }, []);

        return <FormHelperText>{helperText}</FormHelperText>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (name) {
            const data = {
                name, notes, selectedBase, selectedProtein, selectedAddIns, selectedSauces, selectedToppings, selectedCrispies,
                timestamp: serverTimestamp(),
                orderStatus: false
            }

            await db.collection("forms").add({
                id,
                name, notes, selectedBase, selectedProtein, selectedAddIns, selectedSauces, selectedToppings, selectedCrispies,
                timestamp: serverTimestamp(),
                orderStatus: false
            }).then(() => {
                dispatch(postId(id))
                navigate(`/success/${name}`)
            })

        } else {
            setError(true)
        }


    }
    const showSearch = () => {
        setShowSearchBar(true)
    }


    return (
        <div className="dashboard__formContainer">
            <div className="dashboard__form">

                <div className="dashboard__formTitle">
                    <span>Salad </span>
                    <span>Preparation</span>

                </div>
                {user && (
                    <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/dashboard")}>Dashboard</Button>

                )}
                <div className="dashboard__searchCustomer">
                    {showSearchBar ? <SearchBar /> : (<IconButton onClick={showSearch} >
                        <SearchIcon />
                    </IconButton>)}

                </div>


                {dataRetrieved.length < 1 ? (
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ minWidth: 120, m: 3 }} noValidate>

                            <FormControl component="fieldset" fullWidth>
                                <FormLabel component="legend">Name</FormLabel>
                                <TextField
                                    error={error && !name}
                                    labelid="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="message"
                                    placeholder="Customer's Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {!name && <MyFormHelperText />}


                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120, m: 3 }}>
                            <FormControl component="fieldset" fullWidth>
                                <FormLabel component="legend">Base</FormLabel>
                                <TextField
                                    labelid="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name="message"
                                    select
                                    value={selectedBase}
                                    label="Select an option"

                                    onChange={(e) => setSelectedBase(e.target.value)}
                                >
                                    {base.map((each, index) => (
                                        <MenuItem value={each} key={index} name={each}>{each}</MenuItem>
                                    ))}


                                </TextField>
                            </FormControl>
                        </Box>
                        <MultipleSelect value={protein} label="Protein" setState={setSelectedProtein} />
                        <MultipleSelect value={addIns} label="Add Ins" setState={setSelectedAddIns} />


                        <Box sx={{ minWidth: 120, m: 3 }}>

                            <FormControl component="fieldset" fullWidth>
                                <FormLabel component="legend">Sauces</FormLabel>
                                <TextField
                                    labelid="demo-simple-select-label"
                                    id="demo-simple-select"
                                    select
                                    value={selectedSauces}
                                    label="Select an option"
                                    onChange={(e) => setSelectedSauces(e.target.value)}


                                >
                                    {sauces.map((each, index) => (
                                        <MenuItem value={each} key={index}>{each}</MenuItem>
                                    ))}


                                </TextField>
                            </FormControl>
                        </Box>
                        <MultipleSelect value={toppings} label="Toppings" setState={setSelectedToppings} />


                        <MultipleSelect value={crispies} label="Crispies" setState={setSelectedCrispies} />


                        <Box sx={{ minWidth: 120, mr: 4 }}>
                            <FormControl fullWidth sx={{ m: 3 }} component="fieldset" variant="standard" fullWidth>
                                <FormLabel component="legend">Additional Note</FormLabel>
                                <TextField
                                    id="outlined-multiline-static"
                                    multiline

                                    rows={4}
                                    value={notes}


                                    onChange={(e) => setNotes(e.target.value)}

                                />

                            </FormControl>
                        </Box >
                        <Box sx={{ m: 3, width: 100 }}>
                            <Button type="submit" variant="contained" >Submit</Button>

                        </Box>
                    </form>) : (<Data />)}

            </div>
        </div >
    )
}

export default Form


