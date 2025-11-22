import ApplicationSelector from "@/features/vm-request/components/ApplicationSelector";
import CustomIDField from "@/features/vm-request/components/CustomIDField";
import Environment from "@/features/vm-request/components/Environment";
import NetworkZone from "@/features/vm-request/components/NetworkZone";
import { OSSection } from "@/features/vm-request/components/OSSection";
import { Placement } from "@/features/vm-request/components/Placement";
import { ResourceDetailsSection } from "@/features/vm-request/components/ResourceDetailsSection";
import { StepNavigation } from "@/features/vm-request/components/StepNavigation";
import { Grid, Stepper, Step, StepLabel, Divider } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/new/vm/")({
  component: NewVM,
});

function NewVM() {
  const vmSteps = ["Metadata", "Tags", "Add-Ons", "Review"];

  return (
    <Grid container spacing={2} sx={{ marginLeft: 0 }}>
      {/* FORM STEPS */}
      <Grid size={12}>
        <Stepper activeStep={0} alternativeLabel>
          {vmSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ marginY: 2 }} />
      </Grid>

      {/* Metadata form fields */}
      <Grid size={6}>
        <ApplicationSelector />
      </Grid>

      <Grid size={3}>
        <CustomIDField />
      </Grid>

      <Grid size={3}>
        <h1>Placeholder</h1>
      </Grid>

      <Grid size={5}>
        <Environment />
      </Grid>

      <Grid size={4}>
        <NetworkZone />
      </Grid>

      <Grid size={9}>
        <Divider sx={{ marginY: 2 }} />
        <OSSection />
        <Divider sx={{ marginY: 2 }} />
        <Placement />
        <Divider sx={{ marginY: 2 }} />
        <ResourceDetailsSection />
        <StepNavigation />
      </Grid>

      {/* TODO - add remaining fields; add steps logic */}
    </Grid>
  );
}
