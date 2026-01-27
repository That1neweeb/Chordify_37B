import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

// private routes checks whether the user is logged in or not and if not i will redirect to / route
function PrivateRoutes() {

    // from this global auth context we get the logged-in user 
    const {user, loading} = useAuth();

    if(loading) return <Spinner />

    //if user is not logged in then redirect to /
    if(!user) {
        return <Navigate to="/" replace/>
    }
    return <Outlet/>;
}

export default PrivateRoutes;