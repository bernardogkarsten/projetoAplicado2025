"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack"; // IMPORTANTE
import Logo from "@/components/ui/Logo";
import LongInput from "@/components/ui/LongInput";
import LongButton from "@/components/ui/LongButton";

type LoginFormData = {
  email: string;
  senha: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar(); // HOOK do notistack

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.email,
          password: data.senha,
        }),
      });

      if (!res.ok) throw new Error("Credenciais inválidas");

      const json = await res.json();
      enqueueSnackbar("Login bem-sucedido!", { variant: "success" });
      console.log("Login bem-sucedido:", json);

      // Redirecionar após sucesso
      router.push("/dashboard");
    } catch (err) {
      enqueueSnackbar("Erro ao logar: " + (err as Error).message, {
        variant: "error",
      });
      console.error("Erro ao logar:", err);
    }
  };

  const handleSignupRedirect = () => {
    router.push("/signup");
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Stack spacing={4} alignItems="center" width="100%">
          <Logo />

          <Stack spacing={2} alignItems="center" width="100%">
            <LongInput
              label="E-mail"
              type="text"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email", { required: "E-mail é obrigatório" })}
            />

            <LongInput
              label="Senha"
              type="password"
              error={!!errors.senha}
              helperText={errors.senha?.message}
              {...register("senha", { required: "Senha é obrigatória" })}
            />

            <LongButton label="Entrar" type="submit" />

            <Typography
              variant="body2"
              sx={{ color: "primary.main", cursor: "pointer" }}
              onClick={handleSignupRedirect}
            >
              Não tem conta? Cadastre-se!
            </Typography>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
