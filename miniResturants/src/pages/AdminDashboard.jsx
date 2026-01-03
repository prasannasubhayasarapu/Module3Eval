import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
const initialFormState={
    name:'',
    type:'Chinese',
    image:'https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg',
    parkingAvailability:true,

}
export default function AdminDashboard(){
    const {restaurants,addRestaurant,updateRestaurants,deleteRestaurant}=useApp()
    const[filteredRestaurants, setFilteredRestaurants]=useState(restaurants)
const[showForm,setShowForm]=useState(initialFormState)
const [form,setForm]=useState(initialFormState)
const[editingId,setEditingId]=useState(null)
const navigate =useNavigate()
useEffect(()=>{
    setFilteredRestaurants(restaurants)

},[restaurants])



const handleSearch=(term)=>{
    const filtered=restaurants.filtered(r=>
        r.name.toLowerCase().includes(term.toLowerCase())

    )
    setFilteredRestaurants(filtered)
}

const handleFiltertype=(type)=>{
    const filtered=type?restaurants.filter(r=>r.type===type):restaurants
    setFilteredRestaurants(filtered)
}
const handleFilterParking=(hasParking)=>{
    const filtered=typeof hasParking==='boolean'?
    restaurants.filter(r=>r.parkingAvailability===hasParking)
    :restaurants
    setFilteredRestaurants(filtered)
}
}