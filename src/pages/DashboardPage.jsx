import { Button } from "@nextui-org/react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import {
  CalculatorIcon,
  CurrencyDollarIcon,
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import enigmaGrowLogo from "../assets/enigma_grow.png";

const navigation = [
  { name: "Home", href: "/dasboard", icon: HomeIcon },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: UsersIcon,
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: ShoppingBagIcon,
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Counter",
    href: "/dashboard/counter",
    icon: CalculatorIcon,
  },
];

function DashboardPage() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-gray">
      {/** */}
      <div className="w-20 md:w-64 flex-shrink-0 transition-all duration-300">
        <div className="h-full flex flex-col bg-primary">
          <div className="flex items-center h-16 flex-shrink-0 px-4 py-10 bg-primary-dark">
            <div className="flex items-center w-full">
              <img
                className="h-8 w-8 rounded-full"
                src={user.profilePictureUrl}
                alt="Avatar"
              />
              <div className="ml-3 hidden md:block space-y-0.5">
                <p className="text-sm font-medium text-text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs font-medium text-text-white truncate">
                  {user.email}
                </p>
                <p className="text-xs font-medium text-yellow-400 uppercase tracking-wide mt-1">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
