import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import Spinner from "../components/Spinner";

function AdminRoutes() {

    const {user, loading} = useAuth();

    if(loading) return <Spinner />

    if(!user || user.role !== "admin") {
        return <Navigate to="/" replace/>;
    }

    return <Outlet/>;

}

export default AdminRoutes;