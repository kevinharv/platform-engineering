import type { FC } from "react";
import { Box, Typography } from "@mui/material";
import { useVMRequest } from "../context";

interface ReceiptRowProps {
  label: string;
  value: string;
}

const ReceiptRow: FC<ReceiptRowProps> = ({ label, value }) => (
  <div style={{ display: "flex", fontSize: 18 }}>
    <div style={{ flex: 1, textAlign: "left" }}>{label}</div>
    <div style={{ flex: 1, textAlign: "right" }}>{value}</div>
  </div>
);

// TODO - refactor to track field name, field display name, field value, and field display value.
// EX: Network Zone (networkZone) is PCI (pci)

export const Receipt: FC = () => {
  const { formData } = useVMRequest();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 400,
      }}
    >
      <Box
        sx={{
          fontFamily: "monospace",
          bgcolor: "#fffff0",
          p: 3,
          borderRadius: 1,
          border: "1px solid",
          borderColor: "rgba(0,0,0,0.1)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          width: "90%",
          mx: "auto",
          flex: "1 1 auto",
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            variant="h5"
            sx={{ fontFamily: "monospace", fontWeight: "bold" }}
          >
            Virtual Machine Order
          </Typography>
        </Box>

        <Box
          sx={{
            borderTop: "2px dashed",
            borderColor: "divider",
            my: 2,
          }}
        />

        {Object.entries(formData).map(([key, value]) => {
          if (!value || (Array.isArray(value) && value.length === 0))
            return null;

          if (key === "tags") {
            return value.map((tag: any, index: number) => (
              <ReceiptRow
                key={`tag-${index}`}
                label={`Tag ${index + 1}`}
                value={`${tag.key}=${tag.value}`}
              />
            ));
          }

          return <ReceiptRow key={key} label={key} value={value} />;
        })}

        <Box
          sx={{
            borderTop: "2px dashed",
            borderColor: "divider",
            mt: 2,
            pt: 2,
            textAlign: "center",
          }}
        >
          <ReceiptRow
            label="Total"
            value={formData.monthlyCost.toFixed(2) + "/month"}
          />
          <Typography variant="body2" sx={{ fontFamily: "monospace", mt: 8 }}>
            Some orders require additional approval steps and will not be
            provisioned immediately.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
