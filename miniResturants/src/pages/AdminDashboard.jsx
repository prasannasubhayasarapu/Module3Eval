import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Resturantcard from "../components/ResturantCard";
import { useApp } from "../context/AppContext";
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
const handleAdd=(e)=>{
    e.preventDefault()
    if(!form.name.trim())return alert('Name is req')
        addRestaurant(form)
    setForm(initialFormState)
    setShowForm(false)
}
 const handleEdit=(restaurant)=>{
    setForm({
        name:restaurant.name,
        type:restaurant.type,
        image:restaurant.image
        ,
        parkingAvailability:restaurant.parkingAvailability,
    })
    setEditingId(restaurant.restaurantId)
    setShowForm(true)
 }
const handleUpdate=(e)=>{
    e.preventDefault()
    if(!form.name.trim())return alert('Name is Required')
        updateRestaurants(editingId,form)
    setForm(initialFormState)
    setShowForm(false)
}
const handleDelete=(id)=>{
    if(window.confirm('Are you sure you want ot delete this restuarant?'))
    {
        deleteRestaurant(id)
    }
}

return(
    <div>
        <Navbar onSearch={handleSearch}
        onFilterType={handleFiltertype}
        onFilterParking={handleFilterParking}/>
<div style={{display:'flex'}}>
    <div style={{width:'300px',padding:'1rem',borderRight:'1px solid red'}}>
    <h3>{editingId?handleUpdate:handleAdd}</h3>
    <form onSubmit={editingId?handleUpdate:handleAdd}>
        <input type="text" placeholder="Restaurant Name" value={form.name}
        onChange={(e)=>setForm({...form,name:e.target.value})}
        />
        <select value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})}>
            {['Chinese','European','Indian','North indian','South Indian','Bangladesh'].map(t=>(
                <option key={t} value={t}>{t}</option>
            ))}
            </select>
            <input type="text"placeholder="img url" value={form.image} onChange={(e)=>{
                setForm({...form,parkingAvailability:e.target.checked})}
            }/>
<button type="button" onClick={()=>{
    setEditingId(null);setShowForm(false);
    setForm(initialFormState)}}>
        cancel</button>
           
    </form>
</div>
<div>
    <div>
        {filteredRestaurants.map((r)=>(
            <Resturantcard key={r.restaurantId} restaurant={r} 
            showActions={true} onEdit={handleEdit} onDelete={handleDelete}
   />))}
    </div>
</div>
    </div>
    </div>
)
}