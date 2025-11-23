import type { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useVMRequest } from '../context';

interface ReceiptRowProps {
  label: string;
  value: string;
}

const ReceiptRow: FC<ReceiptRowProps> = ({ label, value }) => (
  <div style={{ display: 'flex' }}>
    <div style={{ flex: 1, textAlign: 'right', paddingRight: 8 }}>{label}</div>
    <div style={{ flex: 1, textAlign: 'left' }}>{value}</div>
  </div>
);

export const Receipt: FC = () => {
  const { formData } = useVMRequest();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 400, }}>
      <Box
        sx={{
          fontFamily: 'monospace',
          bgcolor: '#fffff0',
          p: 3,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'rgba(0,0,0,0.1)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          width: '90%',
          // maxWidth: 400,
          mx: 'auto',
          flex: '1 1 auto',
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
            VM REQUEST RECEIPT
          </Typography>
        </Box>

        <Box sx={{ 
          borderTop: '1px dashed',
          borderColor: 'divider',
          my: 2 
        }} />

        {Object.entries(formData).map(([key, value]) => {
          if (!value || (Array.isArray(value) && value.length === 0)) return null;
          
          if (key === 'tags') {
            return value.map((tag: any, index: number) => (
              <ReceiptRow
                key={`tag-${index}`}
                label={`Tag ${index + 1}`}
                value={`${tag.key}=${tag.value}`}
              />
            ));
          }
          
          const label = key === 'osFamily' ? 'OS Family'
            : key === 'osVersion' ? 'OS Version'
            : key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
          const displayValue = value;
            
          return (
            <ReceiptRow
              key={key}
              label={label}
              value={displayValue}
            />
          );
        })}

        <Box sx={{ 
          borderTop: '1px dashed',
          borderColor: 'divider',
          mt: 2,
          pt: 2,
          textAlign: 'center' 
        }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
            Thank you for your request!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};