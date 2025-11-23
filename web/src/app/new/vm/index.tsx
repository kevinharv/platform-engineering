import ApplicationSelector from "@/features/vm-request/components/ApplicationSelector";
import CustomIDField from "@/features/vm-request/components/CustomIDField";
import Environment from "@/features/vm-request/components/Environment";
import NetworkZone from "@/features/vm-request/components/NetworkZone";
import { OSSection } from "@/features/vm-request/components/OSSection";
import { Placement } from "@/features/vm-request/components/Placement";
import { ResourceDetailsSection } from "@/features/vm-request/components/ResourceDetailsSection";
import { ServerTier } from "@/features/vm-request/components/ServerTier";
import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/new/vm/")({
  component: NewVM,
});

function NewVM() {
  const vmSteps = ["Metadata", "Tags", "Add-Ons", "Review"];
  const [step, setStep] = useState(0);

  return (
    <Grid container spacing={2} sx={{ marginLeft: 0 }}>
      {/* FORM STEPS */}
      <Grid size={12}>
        <Stepper activeStep={step} alternativeLabel>
          {vmSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ marginY: 2 }} />
      </Grid>

      {/* METADATA FORM FIELDS */}
      <Grid container size={8}>
        <Grid size={6}>
          <ApplicationSelector />
        </Grid>

        <Grid size={3}>
          <CustomIDField />
        </Grid>

        <Grid size={3}>
          <ServerTier />
        </Grid>

        <Grid size={6}>
          <Environment />
        </Grid>

        <Grid size={6}>
          <NetworkZone />
        </Grid>

        <Grid size={12}>
          <Divider sx={{ marginY: 2 }} />
          <OSSection />
          <Divider sx={{ marginY: 2 }} />
          <Placement />
          <Divider sx={{ marginY: 2 }} />
          <ResourceDetailsSection />

          {/* Form navigation buttons */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 2 }}
          >
            {step > 0 && (
              <Button variant="outlined" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {step < vmSteps.length - 1 && (
              <Button
                variant="contained"
                onClick={() => setStep(step + 1)}
                size="large"
              >
                Next
              </Button>
            )}
            {step == vmSteps.length - 1 && (
              <Button
                variant="contained"
                onClick={() => alert("Submitted!")}
                size="large"
              >
                Submit
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* TAGS FORM FIELDS */}

      {/* ADD-ONS FORM FIELDS */}

      {/* REVIEW VIEW */}

      {/* RECEIPT SECTION */}
      {step < vmSteps.length - 1 && (
        <Grid size={4}>
          <h1>Placeholder</h1>
          <h1>Placeholder</h1>
          <h1>Placeholder</h1>
          <h1>Placeholder</h1>
        </Grid>
      )}
    </Grid>
  );
}
