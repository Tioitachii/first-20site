import { useMemo } from "react";
import Layout from "@/components/Layout";
import { AnimeCard } from "@/components/AnimeCard";
import { animeData } from "@/lib/animeData";

export default function Index() {
  const sections = useMemo(
    () => [
      { id: "patrocinados", title: "Patrocinados", items: animeData.patrocinados },
      { id: "sugestoes", title: "Sugestões para Você", items: animeData.sugestoes },
      { id: "finalizados", title: "Animes Finalizados", items: animeData.finalizados },
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
                {section.id === "patrocinados" ? (
                  <span className="inline-flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 text-accent" fill="currentColor"><path d="M6.5 3h11l3 4.5-8.5 13L3.5 7.5 6.5 3zm0 0l5.5 4.5L18 3"/></svg>{section.title}</span>
                ) : (
                  section.title
                )}
              </h2>
              <a href={`/#${section.id}`} className="text-sm text-accent hover:underline">
                Ver todos →
              </a>
            </div>
            <div className="no-scrollbar -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2">
              {section.items.map((anime) => (
                <div key={anime.id} className="snap-start">
                  <AnimeCard anime={anime} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
}
