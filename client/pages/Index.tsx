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
            <Carousel className="group relative">
              <CarouselContent className="-ml-4">
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
                    className="pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
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
              <CarouselPrevious className="-left-10 hidden border-none bg-black/60 text-white shadow-md group-hover:flex md:flex" />
              <CarouselNext className="-right-10 hidden border-none bg-black/60 text-white shadow-md group-hover:flex md:flex" />
            </Carousel>
          </section>
        ))}
      </div>
    </Layout>
  );
}
