import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { getSearchStatus, searchData } from '../features/dataSlice';


function SearchBar() {
    const [name, setName] = useState("")
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setName(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault()


        const query = db.collection("completedOrders")
        query.onSnapshot(snapshot => {
            const docArray = []
            const filteredCustomer = snapshot.docs.filter(async doc => {

                if (name.toLowerCase() === doc.data().name.toLowerCase()) {

                    dispatch(getSearchStatus())
                    docArray.push(doc.data())
                    setName("")
                }


            }

            )

            dispatch(searchData(docArray))


        })

    }




    return (
        <div className="dashboard__searchBar">
            <form onSubmit={handleSubmit}>
                <input placeholder="Search Customer..." value={name} onChange={handleChange} />
                <SearchIcon className="searchIcon" />

            </form>

        </div>
    )
}

export default SearchBar
