import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Layout, { Container } from "@/components/Layout";
import { AnimeCard } from "@/components/AnimeCard";
import { animeData, type AnimeCollections } from "@/lib/animeData";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

const metadata: Record<keyof AnimeCollections, { title: string; description: string }> = {
  patrocinados: {
    title: "Todos os Patrocinados",
    description:
      "Lista completa dos animes patrocinados com acesso prioritário e eventos especiais.",
  },
  sugestoes: {
    title: "Sugestões Especiais",
    description:
      "Curadoria dinâmica para você descobrir novos mundos, baseada nas preferências da comunidade.",
  },
  finalizados: {
    title: "Clássicos Finalizados",
    description:
      "Séries concluídas para maratonar sem esperar por novos episódios.",
  },
};

const katanaVariants = ["katana", "katanaX", "katanaVertical", "katanaStorm", "katanaArc"] as const;

type CollectionKey = keyof AnimeCollections;

export default function CollectionPage() {
  const { collection } = useParams<{ collection: string }>();
  const key = collection as CollectionKey | undefined;

  const content = useMemo(() => {
    if (!key || !(key in animeData)) return null;
    const info = metadata[key];
    const items = animeData[key];
    return { info, items };
  }, [key]);

  if (!content) {
    return <Navigate to="/" replace />;
  }

  const { info, items } = content;

  return (
    <Layout>
      <Container className="space-y-10 py-10">
        <div className="space-y-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Início</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/#${collection}`}>{info.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{info.title}</h1>
            <p className="max-w-2xl text-sm text-muted-foreground">{info.description}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{items.length} títulos encontrados</span>
              <span>•</span>
              <Link className="text-accent hover:underline" to={`/#${collection}`}>
                Ver destaque na página inicial
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((anime, index) => {
            const variant =
              key === "finalizados"
                ? "genjutsu"
                : katanaVariants[(index + (key === "sugestoes" ? 1 : 0)) % katanaVariants.length];
            const showLabel = key !== "finalizados";
            return (
              <AnimeCard key={anime.id} anime={anime} variant={variant} showVariantLabel={showLabel} />
            );
          })}
        </div>

        <div className="flex justify-end">
          <Button asChild variant="outline">
            <Link to="/">Voltar para o início</Link>
          </Button>
        </div>
      </Container>
    </Layout>
  );
}
