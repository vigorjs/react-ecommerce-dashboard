import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <h1>{user.role}</h1>
      <Outlet />,
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to={"dashboard"} />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
        children: [
          {
            path: "",
            element: <h1>Welcome to Dashboard Home</h1>,
          },
          {
            path: "users",
            element: <h1>User List</h1>,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
