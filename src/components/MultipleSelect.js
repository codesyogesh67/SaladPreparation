import React, { useState } from 'react'
import { Box, FormControl, FormLabel, FormGroup, Checkbox, FormControlLabel } from '@mui/material';

function MultipleSelect(props) {
    const { value, setState, label, ...other } = props;
    const [checkedState, setCheckedState] = useState(new Array(value.length).fill(false))

    const handleChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) => index === position ? !item : item)
        setCheckedState(updatedCheckedState)
        const newArray = []
        const selected = updatedCheckedState.filter((currentState, index) => {
            if (currentState === true) {

                newArray.push(value[index])

            }
        })
        setState(newArray)


    }
    return (
        <Box>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                <FormLabel component="legend">{label}</FormLabel>
                <FormGroup>
                    {value.map((each, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox checked={checkedState[index]} onChange={() => handleChange(index)} name={each} />

                            }
                            // (e) => setSelectedProtein([...selectedProtein, e.target.value])
                            value={each}

                            label={each}
                        />
                    ))}


                </FormGroup>



            </FormControl>
        </Box>
    )
}

export default MultipleSelect
