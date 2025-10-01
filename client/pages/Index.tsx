import { useMemo } from "react";
import Layout from "@/components/Layout";
import { AnimeCard } from "@/components/AnimeCard";
import { animeData } from "@/lib/animeData";
import { Gem } from "lucide-react";

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
              {section.id === "patrocinados" ? (
                <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/60 bg-accent/10">
                    <Gem className="h-5 w-5 text-accent" />
                  </span>
                  {section.title}
                </h2>
              ) : (
                <h2 className="border-l-4 border-accent pl-3 text-2xl font-bold tracking-tight">
                  {section.title}
                </h2>
              )}
              <a
                href={`/#${section.id}`}
                className="text-sm text-accent hover:underline"
              >
                Ver todos →
              </a>
            </div>
            <div className="no-scrollbar -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2">
              {section.items.map((anime, idx) => {
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
