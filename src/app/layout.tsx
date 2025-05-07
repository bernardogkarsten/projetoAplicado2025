// src/app/layout.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { makeServer } from "@/mirage/server";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";

let server: any = null;

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      typeof window !== "undefined" &&
      !server
    ) {
      server = makeServer();
    }
  }, []);

  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
