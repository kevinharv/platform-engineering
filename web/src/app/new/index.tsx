import { ComputerOutlined, CodeOutlined } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/new/")({
  component: NewPage,
});

function NewPage() {
  return (
    <Grid
      container
      spacing={4}
      sx={{
        p: 4,
        justifyContent: "center",
        alignItems: "center",
        m: 0, // Remove default margin
      }}
    >
      <Grid>
        <Link to="/new/vm/form" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            sx={{
              p: 12,
              fontSize: 24,
              fontWeight: "bold",
              minWidth: 300,
            }}
            startIcon={<ComputerOutlined />}
          >
            Virtual Machine
          </Button>
        </Link>
      </Grid>

      <Grid>
        <Link to="/new/namespace" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            sx={{
              p: 12,
              fontSize: 24,
              fontWeight: "bold",
              minWidth: 300,
            }}
            startIcon={<CodeOutlined />}
          >
            Kubernetes Namespace
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
