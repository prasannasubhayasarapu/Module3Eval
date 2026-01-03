import { Children, useEffect, useState } from "react"
import { useContext,createContext } from "react"

const AppContext =createContext()
export const useApp =()=>useContext(AppContext)

export const AppProvider=({children})=>{
    const[user,setUser]=useState(null)
    const[restaurants,setRestaurants]=useState([])

useEffect(()=>{
    const saved=localStorage.getItem('restuarants')
    if(saved){
        try{
            setRestaurants(JSON.parse(saved))

        }catch(e){
            setRestaurants([])
        }
    }
},[])

useEffect(()=>{
    localStorage.setItem('restuarants',JSON.stringify(restaurants))
},[restaurants])
const login=(email,password)=>{
    if(email === 'admin@gmail.com'&&password==='admin1234'){
        setUser({role:'admin',email})
        return 'admin'
    }
    else if(email==='customer@gmail.com '&& password==='customer1234'){
        setUser({role:'customer',email})
        return 'customer'
    }
    return null 
}
    
const logout=()=>{
    setUser(null)
}
const addRestaurant=(data)=>{
    const newId=restaurants.length>0?Math.max(...restaurants.map(r=>r.restaurantId))+1:1
    setRestaurants([...restaurants,newRestaurant])
}
const updataRestaurant=(id)=>{
    setRestaurants(restaurants.map(r=>r.restaurantId===id?{...r, ...updatedData}:r))
}

const deleteRestaurantt=(id)=>{
    setRestaurants(restaurants.filter(r=>r.restaurantId!==id))
}
return(
    <AppContext.Provider 
    value={{
        user,
        restaurants,
        login,
        logout,
        addRestaurant,
        updataRestaurant,
        deleteRestaurantt,
    }}
    
    >
{children}</AppContext.Provider>
)

}


