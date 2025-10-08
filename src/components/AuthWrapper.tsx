import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

interface AuthWrapperProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requireNonEmptyCart?: boolean;
  guestOnly?: boolean; 
}

const AuthWrapper = ({ children, allowedRoles, requireNonEmptyCart, guestOnly }: AuthWrapperProps) => {
  const { user } = useAuth();
  const { cart } = useCart();

  if (guestOnly) {
    if (user) return <Navigate to="/" replace />;
    return <>{children}</>;
  }

  if (!user) return <Navigate to="/login" replace />;

if (allowedRoles?.includes("admin") && !user.isAdmin) {
  return <div className="text-center mt-20 text-red-600">Unauthorized: Bad Request</div>;
}

  if (requireNonEmptyCart && (!cart || cart.length === 0)) {
    return <Navigate to="/shoppingCart" replace />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
