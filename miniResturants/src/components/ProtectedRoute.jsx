import React from 'react'
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
const ProtectedRoute = ({children,allowedRoles}) =>
    {
        const {user}=useApp()
if(!user){
    return <Navigate to="/login" replace/>
}
if(!allowedRoles.includes(user.role)){
    return <Navigate to ={user.role==='admin'?'/admin/dashboard':'/customers/dashboard'} replace/>

}
return children
}

export default ProtectedRoute