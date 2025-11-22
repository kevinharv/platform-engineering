import type { FC } from 'react';
import { Box, Button } from '@mui/material';
import { useVMRequest } from '../context';

interface StepNavigationProps {
  onNext?: () => void;
  onBack?: () => void;
  isLastStep?: boolean;
}

export const StepNavigation: FC<StepNavigationProps> = ({
  onNext,
  onBack,
  isLastStep = false,
}) => {
  const { currentStep } = useVMRequest();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
      {currentStep > 0 && (
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
      )}
      <Button variant="contained" onClick={onNext} size='large'>
        {isLastStep ? 'Submit' : 'Next'}
      </Button>
    </Box>
  );
};