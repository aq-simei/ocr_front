import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useAuth } from "@/providers/Auth/AuthProvider";

export const NavigationBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Upload", path: "/upload" },
    { name: "Documents", path: "/documents" },
  ];

  const handleClicked = () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    logout();
  };

  return (
    <nav className="bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`${
                    pathname == item.path
                      ? "border-indigo-500 text-primary-foreground"
                      : "border-transparent text-muted-foreground hover:border-gray-300 hover:text-primary-foreground font-semibold"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold motion-duration-2000 motion-opacity-in-0`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="sm:ml-6 sm:flex sm:items-center">
            <Button
              className={twMerge(
                "bg-indigo-600  font-bold px-4 py-2 rounded-md text-sm focus:outline",
                "hover:text-primary hover:bg-white hover:shadow-2xl hover:border-2",
                "transition-colors duration-500 ease-in-out"
              )}
              onClick={handleClicked}
            >
              {isAuthenticated ? (
                <>
                  <LogOut strokeWidth={4} />
                  Sign Out
                </>
              ) : (
                <>
                  <LogIn strokeWidth={4} />
                  Login
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
