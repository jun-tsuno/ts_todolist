import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface IProps {
	children: JSX.Element;
}

const ProtectedRoute = ({ children }: IProps) => {
	const { user } = UserAuth();

	return user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
