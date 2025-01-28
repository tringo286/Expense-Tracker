import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAdmin = () => {   
    const location = useLocation();

    const { role } = JSON.parse(localStorage.getItem('user'));    
    
    return (
        role === 'admin'
            ? <Outlet />
            : <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
}

export default RequireAdmin;
