import { useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { AnimeCard } from "@/components/AnimeCard";
import { animeData } from "@/lib/animeData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  const sectionsBackground = "bg-[radial-gradient(120%_100%_at_50%_-10%,rgba(255,255,255,0.08),rgba(10,10,12,0.85)_65%,rgba(5,5,8,0.95))]";

  return (
    <Layout>
      <div className="space-y-10">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24 rounded-3xl border border-white/7 bg-[#05050b]/60 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur"
          >
            <div className="mb-6 flex items-end justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.4em] text-white/40">
                  {section.id === "patrocinados" ? "Rota VIP" : section.id === "sugestoes" ? "Curadoria" : "Encerrados"}
                </span>
                <h2 className="mt-2 inline-flex items-center gap-3 text-3xl font-semibold text-white">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70">
                    {String(section.items.length).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
              </div>
              <Link
                to={`/colecao/${section.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition hover:border-accent hover:text-accent"
              >
                Ver todos
                <span aria-hidden>→</span>
              </Link>
            </div>
            <Carousel className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(140%_80%_at_50%_-30%,rgba(255,255,255,0.12),rgba(8,8,12,0.85))] px-1.5 py-4 backdrop-blur">
              <CarouselContent className="-ml-2 md:-ml-3">
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
                    <CarouselItem
                      key={anime.id}
                      className="pl-2 sm:basis-[44%] lg:basis-[28%] xl:basis-[20%]"
                    >
                      <AnimeCard
                        anime={anime}
                        variant={v}
                        showVariantLabel={showLabel}
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="-left-6 hidden h-9 w-9 border border-white/10 bg-gradient-to-br from-white/15 to-white/5 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:from-white/25 hover:to-white/10 group-hover:flex md:flex" />
              <CarouselNext className="-right-6 hidden h-9 w-9 border border-white/10 bg-gradient-to-br from-white/15 to-white/5 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:from-white/25 hover:to-white/10 group-hover:flex md:flex" />
            </Carousel>
          </section>
        ))}
      </div>
    </Layout>
  );
}
