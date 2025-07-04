"use client";

import HeaderIcon from "@/components/HeaderIcon";
import LongInput from "@/components/ui/LongInput";
import Title from "@/components/ui/Title";

import { Button, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function UserMotoboyPageEdit() {
  const router = useRouter();
  const handleEditar = () => {
    console.log("editou");
  };
  const onBack = () => {
    router.back();
  };
  return (
    <>
      <HeaderIcon />
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.default",
          marginTop: 4,
          marginBottom: 4,
        }}
      >
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Title string={"Novo Pedido"} />
          <LongInput label="Nome" name="nome" type="text" />
          <LongInput label="CPF" name="cpf" type="text" />
          <LongInput label="Telefone" name="telefone" type="tel" />
          <LongInput label="Email" name="email" type="email" />
          <LongInput
            label="Tipo do veículo"
            name="tipoVeiculo"
            type="text"
            disabled
          />
          <LongInput
            label="Placa do veículo"
            name="placaVeiculo"
            type="text"
            disabled
          />
          <LongInput
            label="Chassi do veículo"
            name="chassiVeiculo"
            type="text"
            disabled
          />
          <LongInput label="CNH" name="cnh" type="text" disabled />
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{
              width: "80%",
              maxWidth: 300,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={onBack}
              fullWidth
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditar}
              fullWidth
            >
              Editar
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
