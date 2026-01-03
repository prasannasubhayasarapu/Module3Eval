import { useApp } from "../context/AppContext"
export default function Resturantcard({restaurant,showActions=false,onEdit,onDelete}){
const {user}=useApp()
return(
    <div style={{border:'1px solid #ccc',borderRadius:'8px'}}>
        <img 
        src ={restaurant.image}
        alt={restaurant.name}
        />
        <h3>{restaurant.name}</h3>
        <p><strong>Type:</strong>{restaurant.type}</p>   
        <p><strong>Parking:</strong>{restaurant.parkingAvailabilty?'Available':'Not Available'}</p>
        {showActions && user?.role==='admin' && (
            <div>
                <button onClick={()=>onEdit(restaurant)} style={{marginRight:'0.5 rem'}}>Edit</button>
                        <button onClick={()=>onDelete(restaurant.restaurantId)} style={{marginRight:'0.5 rem'}}>Delete</button>

        
        </div>
        )}
         </div>
)
}