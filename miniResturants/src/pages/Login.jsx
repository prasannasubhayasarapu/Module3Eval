import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Login(){
    const[email,setEmail]=useState('')
    const[password,setPassword] =useState('')
  const[error,setError] =useState('')
  const{login}=useApp()
  const navigate=useNavigate()


  const handleSubmit=(e)=>{
    e.preventDefault()
    const role=login(email,password)
    if(role){
        navigate(role==='admin'?'/admin/dashboard':'/customers/dashboard')


    }else{
        setError('invalid email or password')
    }
}
return(
    <div style={{padding:'2em',maxWidth:'400px',margin:'auto'}}>
        <h2>Login</h2>
        {error && <p style={{color:'red'}}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input 
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                style={{display:'block'}}
                />

            </div>
            <div>
                 <label>Password:</label>
                <input 
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                style={{display:'block'}}
                />
            </div>
            <button type="submit" >Login</button>
        </form>
    </div>
)
}