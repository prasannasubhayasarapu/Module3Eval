
import { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
export default function Navbar({onSearch,onFilterType,onFilterParking}){
    const[searchTerm , setSearchTerm]=useState('')
        const[typeFilter , setTypeFilter]=useState('')
           const[parkingFilter , setParkingFilter]=useState('')
     
           const {user,logout}=useApp()
           const navigate =useNavigate()
           const location=useLocation()
            
           useEffect=(()=>{
const handler =setTimeout(()=>{
    onSearch(searchTerm)
},300)
return()=>clearTimeout(handler)

},[searchTerm])
           
const handleLogout=()=>{
    logout()
    navigate('/login')

}
const types =['ChineseRajasthani',

'Gujarati',
'Mughlai',
'Jain',
'Thai',
'North Indian',

'South Indian']

return(
    <nav style={{display:'flex',justifyContent:'space-between'}}
    >
        <div>
            <button onClick={()=>navigate(user?.role === 'admin' ? '/admin/dashboard' :'/customers/dashboard')}>
                Dashboard
            </button>
            {user && <span style={{marginLeft:'1rem'}}>Hello,{user.role}</span>}
        </div>
        <div style={{display:"flex"}}>
            <input 
            type="text" 
            placeholder="searc by name"
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            style={{padding:'0.4rem'}}
            />
            <Select value={typeFilter} onChange={(e)=>{
                setParkingFilter(e.target.value)
                onFilterType(e.target.value)

            }}
            style={{
                padding:'0.4rem'
            }}>
                <option value=''>All Types</option>
                {types.map(t=><option key={t} value={t}>{t}</option>)}
            </Select>
            <select value ={parkingFilter} onChange={(e)=>{
                setParkingFilter(e.target.value)
                onFilterParking(e.target.value==='true')
            
            }}
            style={{padding:'0.4rem'}}>
                <option value=''>All parking</option>
                                <option value='true'>Available</option>

                <option value='false'>Not Available</option>

            </select>
            {user && <button onClick={handleLogout}>Logout</button>}
        </div>
    </nav>
)
}