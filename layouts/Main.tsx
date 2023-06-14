import Head from "next/head";
import Header from "components/header";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ThemeContext } from "components/context/theme-context";

type LayoutType = {
  title?: string;
  children?: React.ReactNode;
};

export default ({ children, title = "Next.js Ecommerce" }: LayoutType) => {
  const { theme } = useContext(ThemeContext);

  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="app-main" data-theme={theme}>
      <Head>
        <title>{title}</title>
      </Head>

      <Header />

      <main className={pathname !== "/" ? "main-page" : "main-home-page"}>
        {children}
      </main>
    </div>
  );
};
