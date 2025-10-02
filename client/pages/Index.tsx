import { useMemo } from "react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { AnimeCard } from "@/components/AnimeCard";
import { animeData } from "@/lib/animeData";

const PREVIEW_COUNT = 6;

export default function Index() {
  const sections = useMemo(
    () => [
      {
        id: "patrocinados",
        title: "Patrocinados",
        items: animeData.patrocinados,
      },
      {
        id: "sugestoes",
        title: "Sugestões para Você",
        items: animeData.sugestoes,
      },
      {
        id: "finalizados",
        title: "Animes Finalizados",
        items: animeData.finalizados,
      },
    ],
    [],
  );

  return (
    <Layout>
      <div className="space-y-12">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <div className="mb-4 flex items-end justify-between">
              <h2 className="border-l-4 border-accent pl-3 text-2xl font-bold tracking-tight">
                {section.title}
              </h2>
              <Link
                to={`/colecao/${section.id}`}
                className="text-sm text-accent hover:underline"
              >
                Ver todos →
              </Link>
            </div>
            <div className="no-scrollbar -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2">
              {section.items.slice(0, PREVIEW_COUNT).map((anime, idx) => {
                const katanaVariants = [
                  "katana",
                  "katanaX",
                  "katanaVertical",
                  "katanaStorm",
                  "katanaArc",
                ] as const;
                const v =
                  section.id === "patrocinados"
                    ? katanaVariants[idx % katanaVariants.length]
                    : section.id === "sugestoes"
                      ? katanaVariants[(idx + 1) % katanaVariants.length]
                      : "genjutsu";
                const showLabel = section.id !== "finalizados";
                return (
                  <div key={anime.id} className="snap-start">
                    <AnimeCard
                      anime={anime}
                      variant={v}
                      showVariantLabel={showLabel}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
}
