
import { Navigate } from "react-router-dom";

export const AuthorizeUser = ({ children }) => {
    const token = localStorage.getItem('tokenUser');

    if(!token){
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children;
}


export const ProtectRoute = ({ children }) => {
    const token = localStorage.getItem('tokenUser');
    if(!token){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}