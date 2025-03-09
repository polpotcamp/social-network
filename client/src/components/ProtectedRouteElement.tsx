import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
type ProtectedRouteElementProps = {
  component: any;
  onlyUnAuth?: boolean;
};
const ProtectedRouteElement = ({
  onlyUnAuth = false,
  component,
}: ProtectedRouteElementProps) => {
  const isAuthorization = useAppSelector(
    (state) => state.userReducer.isAuthorization
  );
  const location = useLocation();
  const from = location.state?.from || "/";
  if (isAuthorization && onlyUnAuth) {
    return <Navigate to={from} />;
  }
  if (!isAuthorization && !onlyUnAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return component;
};
export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }: ProtectedRouteElementProps) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);