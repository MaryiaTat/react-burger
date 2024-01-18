import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";

interface ProtectedProps {
  onlyUnAuthUsers?: boolean;
  component: JSX.Element | null;
}

const Protected: FC<ProtectedProps> = ({
  onlyUnAuthUsers = false,
  component,
}) => {
  const location = useLocation();
  const { isAuthChecked, user } = useAppSelector((store) => store.user);
  if (!isAuthChecked) return null;
  if (onlyUnAuthUsers && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }
  if (!onlyUnAuthUsers && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: ProtectedProps) => (
  <Protected onlyUnAuthUsers={true} component={component} />
);
