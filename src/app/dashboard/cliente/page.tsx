"use client";

import HeaderIcon from "@/components/HeaderIcon";
import { Stack, Box, Container } from "@mui/material";
import Image from "next/image";
import { ButtonIcon } from "@/components/ui/ButtonIcon";

import novoPedido from "../../../assets/icon/novoPedido.svg";
import pedidoAndamento from "../../../assets/icon/pedidoAndamento.svg";
import historicoPedido from "../../../assets/icon/historicoPedido.svg";
import perfilUsuario from "../../../assets/icon/perfilUsuario.svg";
import Whatsapp from "@/components/Whatsapp";

export default function DashboardCliente() {
  const handleNovoPedido = () => {
    console.log("novo pedido");
  };
  const handlePedidosEmAndamento = () => {
    console.log("pedidos em andamento");
  };
  const handleHistorico = () => {
    console.log("histórico");
  };
  const handlePerfil = () => {
    console.log("perfil");
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
          marginTop: "-100px",
        }}
      >
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 1,
              width: "100%",
              rowGap: 4,
            }}
          >
            <ButtonIcon
              label="Novo Pedido"
              icon={
                <Image
                  src={novoPedido}
                  alt="Novo pedido"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              }
              onClick={handleNovoPedido}
            />

            <ButtonIcon
              label="Pedidos em andamento"
              icon={
                <Image
                  src={pedidoAndamento}
                  alt="Pedidos em andamento"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              }
              onClick={handlePedidosEmAndamento}
            />

            <ButtonIcon
              label="Histórico de pedidos"
              icon={
                <Image
                  src={historicoPedido}
                  alt="Histórico de pedidos"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              }
              onClick={handleHistorico}
            />

            <ButtonIcon
              label="Perfil do usuário"
              icon={
                <Image
                  src={perfilUsuario}
                  alt="Perfil do usuário"
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              }
              onClick={handlePerfil}
            />
          </Box>
        </Stack>
      </Container>
      <Whatsapp />
    </>
  );
}
