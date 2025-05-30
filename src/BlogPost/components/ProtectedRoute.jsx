import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAdmin, children }) {
  if (!isAdmin) {
    // Se não for admin, redireciona para a home ou login
    return <Navigate to="/" replace />;
  }
  // Se for admin, renderiza o conteúdo
  return children;
}

export default ProtectedRoute;