import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Film, Tv, Gem, Shield, Building2, Tags, Gauge } from "lucide-react";
import type { Anime } from "@/lib/animeData";
import { cn } from "@/lib/utils";
import { getDominantColor, rgbToCssRgb } from "@/lib/color";

export function AnimeCard({ anime, className }: { anime: Anime; className?: string }) {
  const [open, setOpen] = useState(false);
  const [accentRgb, setAccentRgb] = useState<string | null>(null);
  const percentWatched = useMemo(
    () => Math.min(100, Math.round((anime.episodioAtual / Math.max(1, anime.episodes)) * 100)),
    [anime.episodioAtual, anime.episodes],
  );

  useEffect(() => {
    let mounted = true;
    getDominantColor(anime.image)
      .then((rgb) => {
        if (mounted) setAccentRgb(rgbToCssRgb(rgb));
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [anime.image]);

  const cssVar = accentRgb ? ({ ["--card-accent-rgb" as any]: accentRgb } as React.CSSProperties) : undefined;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          aria-label={`Abrir ${anime.title}`}
          className={cn(
            "group relative block aspect-[2/3] w-[230px] shrink-0 overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-transform hover:scale-[1.03] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            className,
          )}
        >
          <img src={anime.image} alt={anime.title} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2 py-1 text-xs font-semibold backdrop-blur">
            <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
            <span>{anime.avaliacao.toFixed(1)}</span>
          </div>
        </button>
      </DialogTrigger>

      <AnimatePresence>
        {open && (
          <motion.div className="pointer-events-none fixed inset-0 z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={cssVar}>
            <motion.div
              className="absolute inset-0"
              style={{ background: "radial-gradient(600px circle at center, rgb(var(--card-accent-rgb, 229 57 53)) / 0.35, transparent 70%)" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 3, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
            <motion.img
              src="https://r2.flowith.net/files/o/1758479295415-itachi_uchiha_mangekyou_sharingan_index_0@1024x1024.png"
              alt="Mangekyou Sharingan"
              className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 opacity-0"
              initial={{ rotate: 0, opacity: 0, scale: 0.5 }}
              animate={{ rotate: -720, opacity: 0.25, scale: 1 }}
              exit={{ opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.9, ease: [0.68, -0.55, 0.27, 1.55] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <DialogContent className="z-[61] w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-card/95 p-0 backdrop-blur-md" style={cssVar}>
        <div className="grid max-h-[85vh] grid-cols-1 gap-0 md:grid-cols-[300px,1fr]">
          <div className="relative h-72 w-full md:h-full">
            <img src={anime.image} alt={`Capa de ${anime.title}`} className="h-full w-full object-cover" crossOrigin="anonymous" />
            <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2 py-1 text-xs font-semibold backdrop-blur">
              <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
              <span>{anime.avaliacao.toFixed(1)}</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <motion.div className="space-y-5 p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 120, damping: 18 }}>
            <h3 className="text-2xl font-extrabold tracking-tight">{anime.title}</h3>

            <div className="flex flex-wrap items-center gap-2">
              {anime.genero.map((g) => (
                <Badge key={g} variant="outline" className="border-border/60 bg-background/60 text-foreground/90">
                  <Tags className="mr-1 h-3.5 w-3.5" /> {g}
                </Badge>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-b from-background/60 to-background/30 p-4">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgb(var(--card-accent-rgb, 229 57 53)) / 0.6, transparent)" }} />
              <div className="grid gap-4 md:grid-cols-2">
                <InfoChip icon={<Shield className="h-3.5 w-3.5" />} label="Classificação" value={anime.classificacao} />
                <InfoChip icon={<Building2 className="h-3.5 w-3.5" />} label="Estúdio" value={anime.estudio} />
              </div>

              <div className="mt-4 grid gap-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Gauge className="h-3.5 w-3.5" /> Progresso</span>
                  <span className="font-semibold text-foreground/90">{anime.episodioAtual}/{anime.episodes} • {percentWatched}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary/60">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${percentWatched}%`,
                      background: "rgb(var(--card-accent-rgb, 229 57 53))",
                      boxShadow: "0 0 15px rgb(var(--card-accent-rgb, 229 57 53) / 0.6)",
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <StatGlow icon={<Film className="h-4 w-4" />} label="Episódios" value={String(anime.episodes)} />
                <StatGlow icon={<Tv className="h-4 w-4" />} label="Último Ep." value={`Ep. ${anime.episodioAtual}`} />
                <StatGlow icon={<Gem className="h-4 w-4" />} label="Patrocinados" value={`${anime.episodiosPatrocinados}`} />
                <StatGlow icon={<Building2 className="h-4 w-4" />} label="Estúdio" value={anime.estudio} />
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Sinopse</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{anime.synopsis}</p>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="relative rounded-lg p-[1px]">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/40 via-accent/10 to-transparent opacity-80 blur-[2px]" />
      <div className="relative flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-card/60 px-3 py-2">
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          {icon}
          <span className="uppercase tracking-wider">{label}</span>
        </div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}

function StatGlow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="relative rounded-lg p-[1px]">
      <div className="absolute inset-0 rounded-lg opacity-60" style={{ background: "linear-gradient(to right, transparent, rgb(var(--card-accent-rgb, 229 57 53)) / 0.4, transparent)" }} />
      <div className="relative rounded-lg border border-border/60 bg-card/50 p-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">{icon}<span>{label}</span></div>
        <div className="mt-1 text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}
