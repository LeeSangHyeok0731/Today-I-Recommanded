// app/layout.tsx
import { Header } from "@/components/header/header";
import StyledComponentsRegistry from "@/lib/registry"; // styled-components SSR 지원
import GlobalStyle from "@/style/GlobalStyle";

export const metadata = {
  title: "Your App",
  description: "설명",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          <Header />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
