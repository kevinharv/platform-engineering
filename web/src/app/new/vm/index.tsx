import ApplicationSelector from "@/features/vm-request/components/ApplicationSelector";
import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  Divider
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/new/vm/")({
  component: NewVM,
});

function NewVM() {
  const vmSteps = ["Metadata", "Tags", "Add-Ons", "Review"];

  return (
    <Grid container spacing={2}>
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

      {/* TODO - add remaining fields; add steps logic */}

    </Grid>
  );
}
