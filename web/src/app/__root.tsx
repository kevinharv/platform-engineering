import { Outlet, createRootRoute } from "@tanstack/react-router";
import NavigationDrawer from "@/components/NavigationDrawer";
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <NavigationDrawer>
        <Outlet />
      </NavigationDrawer>
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
