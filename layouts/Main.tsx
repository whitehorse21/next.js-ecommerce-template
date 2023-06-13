import Head from "next/head";
import Header from "components/header";
import { useRouter } from "next/router";
import useLocalStorage from "use-local-storage";

type LayoutType = {
  title?: string;
  children?: React.ReactNode;
};

export default ({ children, title = "Next.js Ecommerce" }: LayoutType) => {
  const defaultDark = false;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

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
