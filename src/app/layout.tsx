// app/layout.tsx
import { Header } from "@/components/header/header";
import GlobalStyle from "@/style/GlobalStyle";

export const metadata = {
  title: "Today i Recommanded",
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
        <GlobalStyle />
        <Header />
        {children}
      </body>
    </html>
  );
}
