import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/new/vm/")({
  component: NewVM,
});

function NewVM() {
  window.location.href = "/new/vm/form"; // Redirect to the first step of VM creation

  return (
    <Outlet /> 
  );
}
