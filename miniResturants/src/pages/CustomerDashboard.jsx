import { useEffect, useState } from "react"
import Resturantcard from "../components/ResturantCard"
import Navbar from "../components/Navbar"
import {useApp} from "../components/AppContext"
export default function CustomerDashboard(){
    const {restaurants} =useApp()
    const [ filteredRestaurants,setFilteredRestaurants]=useState(restaurants)
useEffect(()=>{
    setFilteredRestaurants(restaurants)
},[restaurants])

const handleSearch=(term)=>{
    const filtered=restaurants.filter(r=>
        r.name.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredRestaurants(filtered)
}
const handleFilterType=(type)=>{
    const filtered=type?
    restaurants.filter(r=>r.type===type)
        :restaurants
        setFilteredRestaurants(filtered)
    
}
const handleFilterParking=(hasParking)=>{
    const filtered=typeof hasParking==='boolean'
    ?restaurants.filter(r=>r.parkingAvailability===hasParking)
    :restaurants
    setFilteredRestaurants(filtered)
}
return(
    <div>
        <Navbar 
        onSearch={handleSearch}
        onFilterType={handleFilterType}
        onFilterParking={handleFilterParking}
/>
<div style={{padding:'1rem'}}>
    <div style={{display:'flex'}}>
        {filteredRestaurants.map((r)=>(
            <Resturantcard key={r.restaurantId} restaurant={r}/>

        ))}
    </div>
</div>

        </div>
)

}