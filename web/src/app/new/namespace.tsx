import { Grid } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/new/namespace")({
  component: NewNamespace,
});

function NewNamespace() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        p: 2,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
     <h1>Namespace</h1> 
    </Grid>
  );
}
