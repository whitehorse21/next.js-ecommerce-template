import Head from "next/head";
import Header from "components/header";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

type LayoutType = {
  title?: string;
  children?: ReactNode;
};

export default ({ children, title = "Next.js Ecommerce" }: LayoutType) => {
  const { pathname } = useRouter();

  return (
    <div className="app-main">
      <Head>
        <title key="error-title">{`Page not found — ${String(title || 'Next.js Ecommerce')}`}</title>
      </Head>

      <Header isErrorPage />

      <main className={pathname !== "/" ? "main-page" : ""}>{children}</main>
    </div>
  );
};
