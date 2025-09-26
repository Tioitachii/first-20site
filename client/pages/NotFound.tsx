import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-2 text-4xl font-bold">404</h1>
          <p className="mb-4 text-lg text-muted-foreground">Oops! Página não encontrada</p>
          <a href="/" className="text-accent underline-offset-4 hover:underline">
            Voltar ao início
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
