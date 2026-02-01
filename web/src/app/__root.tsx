import { Outlet, createRootRoute } from "@tanstack/react-router";
import NavigationDrawer from "@/components/NavigationDrawer";
import { VMRequestProvider } from "@/features/vm-request/context";
import { AuthProvider } from "@/components/AuthContext";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <NavigationDrawer>
        <VMRequestProvider>
          <Outlet />
        </VMRequestProvider>
      </NavigationDrawer>
    </AuthProvider>
  ),
});
