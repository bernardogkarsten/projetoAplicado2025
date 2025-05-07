"use client";

import { Box, Container, Stack } from "@mui/material";
import Image from "next/image";
import LongButton from "@/components/ui/LongButton";
import { useRouter } from "next/navigation";
import logo from "../assets/Logo.png";
import Logo from "@/components/ui/Logo";

export default function HomePage() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
      }}
    >
      <Stack spacing={4} alignItems="center" width="100%">
        <Logo />

        <Stack spacing={2} alignItems="center" width="100%">
          <LongButton label="Entrar" onClick={handleLoginRedirect} />
          <LongButton label="Cadastrar" />
        </Stack>
      </Stack>
    </Container>
  );
}
