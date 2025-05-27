"use client";

import { Button, Stack } from "@mui/material";

interface DualButtonProps {
  onBack?: () => void;
  onNext?: () => void;
  backLabel?: string;
  nextLabel?: string;
}

export default function DualButton({
  onBack,
  onNext,
  backLabel = "Voltar",
  nextLabel = "Continuar",
}: DualButtonProps) {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      sx={{
        width: "80%",
        maxWidth: 300,
      }}
    >
      <Button variant="outlined" color="primary" onClick={onBack} fullWidth>
        {backLabel}
      </Button>
      <Button variant="contained" color="primary" onClick={onNext} fullWidth>
        {nextLabel}
      </Button>
    </Stack>
  );
}
