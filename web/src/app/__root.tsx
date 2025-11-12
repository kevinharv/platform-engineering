import { Outlet, createRootRoute } from "@tanstack/react-router";
import NavigationDrawer from "@/components/NavigationDrawer";
import { VMRequestProvider } from "@/features/vm-request/context";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <NavigationDrawer>
      <VMRequestProvider>
        <Outlet />
      </VMRequestProvider>
    </NavigationDrawer>
  ),
});
