import Head from "next/head";
import Header from "components/header";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ThemeContext } from "components/context/theme-context";
import GithubIcon from "../assets/icons/github";
import type { ReactNode } from "react";

type LayoutType = {
  title?: string;
  children?: ReactNode;
};

export default ({ children, title = "Next.js Ecommerce" }: LayoutType) => {
  const { theme } = useContext(ThemeContext);

  const { pathname } = useRouter();

  // Ensure title is always a single string (not an array)
  const pageTitle = typeof title === 'string' 
    ? title 
    : 'Next.js Ecommerce';

  return (
    <div className="app-main" data-theme={theme}>
      <Head>
        <title key="page-title">{pageTitle}</title>
      </Head>

      <a
        href="https://github.com/whitehorse21"
        target="_blank"
        rel="noopener noreferrer"
        className="github-fixed-link"
        aria-label="GitHub"
      >
        <GithubIcon />
      </a>

      <Header />

      <main className={pathname !== "/" ? "main-page" : "main-home-page"}>
        {children}
      </main>
    </div>
  );
};
