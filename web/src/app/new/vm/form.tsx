import { Divider, Grid, Step, StepLabel, Stepper, Box } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { VMRequestProvider, useVMRequest } from "@/features/vm-request/context";
import { BasicInfoSection } from "@/features/vm-request/components/BasicInfoSection";
import { OSSection } from "@/features/vm-request/components/OSSection";
import { ResourceDetailsSection } from "@/features/vm-request/components/ResourceDetailsSection";
import { Receipt } from "@/features/vm-request/components/Receipt";
import { StepNavigation } from "@/features/vm-request/components/StepNavigation";
import { Placement } from "@/features/vm-request/components/Placement";

export const Route = createFileRoute("/new/vm/form")({
  component: NewVM,
});

const steps = ["Metadata", "Tags", "Add-Ons", "Review"];

function NewVMContent() {
  const { currentStep, setStep } = useVMRequest();

  const handleNext = () => {
    setStep(currentStep + 1);
  };

  const handleBack = () => {
    setStep(currentStep - 1);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Divider
          sx={{
            marginTop: 2,
          }}
        />
      </Grid>

      <Grid
        size={7}
        sx={{
          marginTop: 4,
          marginRight: 2,
        }}
      >
        {currentStep === 0 &&
          <Box>
            <BasicInfoSection />
            <OSSection />
            <Placement />
            <ResourceDetailsSection />
          </Box>
        }
        {currentStep === 1 &&
        <Box>
          <p>Tags set here</p>
        </Box>
        }
        {currentStep === 2 &&
        <Box>
          <ul>
            <li>DNS record(s)</li>
            <li>Load balancer config</li>
            <li>Firewall rules?</li>
            <li>Credential management?</li>
          </ul>
        </Box>
        }
        <StepNavigation
          onNext={handleNext}
          onBack={handleBack}
          isLastStep={currentStep === 3}
        />
      </Grid>

      <Grid
        size={4}
        sx={{
          marginTop: 4,
          marginLeft: 2,
        }}
      >
        <Receipt />
      </Grid>
    </Grid>
  );
}

function NewVM() {
  return (
    <VMRequestProvider>
      <NewVMContent />
    </VMRequestProvider>
  );
}
