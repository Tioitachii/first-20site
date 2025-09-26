import { useMemo, useState } from "react";
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

  const [variant, setVariant] = useState<"mangekyo" | "katana" | "genjutsu">("mangekyo");

  return (
    <Layout>
      <div className="space-y-12">
        <div className="mb-2 flex items-center justify-end gap-2 text-xs">
          <span className="text-muted-foreground">Animação:</span>
          <button className={`rounded-md border px-2 py-1 ${variant === "mangekyo" ? "border-accent text-accent" : "border-border"}`} onClick={() => setVariant("mangekyo")}>Mangekyō</button>
          <button className={`rounded-md border px-2 py-1 ${variant === "katana" ? "border-accent text-accent" : "border-border"}`} onClick={() => setVariant("katana")}>Katana</button>
          <button className={`rounded-md border px-2 py-1 ${variant === "genjutsu" ? "border-accent text-accent" : "border-border"}`} onClick={() => setVariant("genjutsu")}>Genjutsu</button>
        </div>
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <div className="mb-4 flex items-end justify-between">
              <h2 className="border-l-4 border-accent pl-3 text-2xl font-bold tracking-tight">
                {section.title}
              </h2>
              <a href={`/#${section.id}`} className="text-sm text-accent hover:underline">
                Ver todos →
              </a>
            </div>
            <div className="no-scrollbar -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2">
              {section.items.map((anime) => (
                <div key={anime.id} className="snap-start">
                  <AnimeCard anime={anime} variant={variant} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
}
