import { Navigate } from "react-router-dom"
import { ReactNode } from "react"

export const RequireAuth = ({children} : { children: ReactNode}) => {
const accessToken = localStorage.getItem('accessToken');
if(!accessToken) {
   return <Navigate to="/auth/login"  replace />
}
return children; 
}