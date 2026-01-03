import React from 'react'

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