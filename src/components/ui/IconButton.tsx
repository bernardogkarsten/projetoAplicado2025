import { Box, Typography, IconButton as MUIButton } from "@mui/material";
import { ReactNode } from "react";

interface IconButtonProps {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}

export function IconButton({ label, icon, onClick }: IconButtonProps) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <MUIButton
        color="primary"
        sx={{
          borderRadius: "5px",
          border: "1px solid",
          padding: "24px",
          width: "auto",
          height: "auto",
        }}
        onClick={onClick}
      >
        {icon}
      </MUIButton>
      <Typography variant="body2" color="primary" sx={{ marginTop: "12px" }}>
        {label}
      </Typography>
    </Box>
  );
}
