import { useEffect, useMemo, useState } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Film,
  Tv,
  Award,
  Shield,
  Building2,
  Tags,
  Gauge,
} from "lucide-react";
import type { Anime } from "@/lib/animeData";
import { cn } from "@/lib/utils";
import { getDominantColor, rgbToCssRgb } from "@/lib/color";
import { getGradientBackground, useGradientTheme } from "@/hooks/use-gradient-theme";

type OverlayVariant =
  | "mangekyo"
  | "katana"
  | "katanaX"
  | "katanaVertical"
  | "katanaStorm"
  | "katanaArc"
  | "genjutsu";

export function AnimeCard({
  anime,
  className,
  variant = "mangekyo",
  showVariantLabel = false,
}: {
  anime: Anime;
  className?: string;
  variant?: OverlayVariant;
  showVariantLabel?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [accentRgb, setAccentRgb] = useState<string | null>(null);
  const { preset } = useGradientTheme();
  const panelBackground = useMemo(
    () => getGradientBackground(preset, "var(--card-accent-rgb, 229 57 53)"),
    [preset],
  );
  const percentWatched = useMemo(
    () =>
      Math.min(
        100,
        Math.round((anime.episodioAtual / Math.max(1, anime.episodes)) * 100),
      ),
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

  const cssVar = accentRgb
    ? ({ ["--card-accent-rgb" as any]: accentRgb } as React.CSSProperties)
    : undefined;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.button
          aria-label={`Abrir ${anime.title}`}
          className={cn(
            "group relative block aspect-[2/3] w-[230px] shrink-0 overflow-hidden rounded-xl border border-border bg-card shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            className,
          )}
          whileTap={{ scale: 0.97 }}
          animate={open ? { scale: 0.92, rotate: 2 } : { scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 18,
            mass: 1.2,
          }}
          style={cssVar}
        >
          <img
            src={anime.image}
            alt={anime.title}
            className="h-full w-full object-cover"
            loading="lazy"
            crossOrigin="anonymous"
          />
          <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2 py-1 text-xs font-semibold backdrop-blur">
            <Star className="h-3.5 w-3.5 text-yellow-400" fill="currentColor" />
            <span>{anime.avaliacao.toFixed(1)}</span>
          </div>
        </motion.button>
      </DialogTrigger>

      <AnimatePresence>
        {open && <OverlayEffect variant={variant} cssVar={cssVar} />}
      </AnimatePresence>

      <DialogContent
        className="z-[61] w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-card/95 p-0 backdrop-blur-md"
        style={cssVar}
      >
        <div className="grid max-h-[85vh] grid-cols-1 gap-0 md:grid-cols-[300px,1fr]">
          <div className="relative h-72 w-full md:h-full">
            <img
              src={anime.image}
              alt={`Capa de ${anime.title}`}
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
            />
            <div
              className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border bg-black/50 px-2 py-1 text-xs font-semibold backdrop-blur"
              style={{
                borderColor: "rgb(var(--card-accent-rgb,229 57 53))",
                color: "rgb(var(--card-accent-rgb,229 57 53))",
              }}
            >
              <Star className="h-3.5 w-3.5 text-yellow-400" fill="currentColor" />
              <span>{anime.avaliacao.toFixed(1)}</span>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <motion.div
            className="space-y-5 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <DialogTitle asChild>
              <h3 className="font-cinzel text-2xl font-extrabold tracking-wide text-yellow-100">
                {anime.title}
              </h3>
            </DialogTitle>

            <div className="flex flex-wrap items-center gap-2">
              {anime.genero.map((g) => (
                <Badge
                  key={g}
                  variant="outline"
                  className="text-foreground"
                  style={{
                    borderColor: "rgb(var(--card-accent-rgb,229 57 53))",
                    backgroundColor:
                      "rgb(var(--card-accent-rgb,229 57 53) / 0.12)",
                    color: "rgb(var(--card-accent-rgb,229 57 53))",
                  }}
                >
                  <Tags className="mr-1 h-3.5 w-3.5" /> {g}
                </Badge>
              ))}
              <AgeBadge value={anime.classificacao} />
            </div>

            <div
              className="relative overflow-hidden rounded-xl border p-4"
              style={{
                borderColor: "rgb(var(--card-accent-rgb,229 57 53) / 0.3)",
                background:
                  "linear-gradient(150deg, rgba(253, 230, 162, 0.26), rgb(var(--card-accent-rgb,229 57 53) / 0.32) 55%, rgba(12, 9, 6, 0.88))",
              }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgb(var(--card-accent-rgb, 229 57 53)) / 0.6, transparent)",
                }}
              />
              <div className="grid gap-4 md:grid-cols-1">
                <InfoChip
                  icon={<Building2 className="h-3.5 w-3.5" />}
                  label="Estúdio"
                  value={anime.estudio}
                />
              </div>

              <div className="mt-4 grid gap-2">
                <div className="flex items-center justify-between text-xs text-yellow-200/70">
                  <span className="inline-flex items-center gap-1">
                    <Gauge className="h-3.5 w-3.5" /> Progresso
                  </span>
                  <span className="font-semibold text-yellow-100">
                    {anime.episodioAtual}/{anime.episodes} • {percentWatched}%
                  </span>
                </div>
                <div
                  className="h-2 w-full rounded-full"
                  style={{
                    backgroundColor:
                      "rgb(var(--card-accent-rgb,229 57 53) / 0.2)",
                  }}
                >
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${percentWatched}%`,
                      background: "rgb(var(--card-accent-rgb,229 57 53))",
                      boxShadow:
                        "0 0 18px rgb(var(--card-accent-rgb,229 57 53) / 0.5)",
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-4">
                <StatGlow
                  icon={<Film className="h-4 w-4" />}
                  label="Episódios"
                  value={String(anime.episodes)}
                />
                <StatGlow
                  icon={<Tv className="h-4 w-4" />}
                  label="Assistido"
                  value={`Ep. ${anime.episodioAtual}`}
                />
                <StatGlow
                  icon={<Award className="h-4 w-4 text-amber-300" strokeWidth={1.6} />}
                  label="Patrocinados"
                  value={`${anime.episodiosPatrocinados}`}
                />
                <StatGlow
                  icon={<Tags className="h-4 w-4" />}
                  label="Gênero"
                  value={anime.genero.join(", ")}
                />
              </div>
            </div>

            <div>
              <h4 className="mb-2 font-cinzel text-xs font-semibold uppercase tracking-[0.2em] text-yellow-200/70">
                Sinopse
              </h4>
              <p className="text-sm leading-relaxed text-yellow-100/90">
                {anime.synopsis}
              </p>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AgeBadge({ value }: { value: string }) {
  const age = parseInt(value, 10);
  const color =
    age >= 18
      ? "bg-red-600/20 text-red-300 border-red-500/40"
      : age >= 16
        ? "bg-orange-600/20 text-orange-300 border-orange-500/40"
        : age >= 14
          ? "bg-amber-600/20 text-amber-300 border-amber-500/40"
          : age >= 12
            ? "bg-yellow-600/20 text-yellow-300 border-yellow-500/40"
            : "bg-emerald-600/20 text-emerald-300 border-emerald-500/40";
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold",
        color,
      )}
    >
      <Shield className="h-3.5 w-3.5" />
      <span>Classificação</span>
      <span className="ml-1 rounded bg-black/30 px-1.5 py-0.5 text-sm font-bold">
        {isNaN(age) ? value : `${age}+`}
      </span>
    </div>
  );
}

function InfoChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="relative rounded-lg p-[1px]">
      <div
        className="absolute inset-0 rounded-lg opacity-80 blur-[2px]"
        style={{ backgroundColor: "rgb(var(--card-accent-rgb,229 57 53))" }}
      />
      <div
        className="relative flex items-center justify-between gap-3 rounded-lg bg-[#19120c]/70 px-3 py-2"
        style={{
          border: "1px solid rgb(var(--card-accent-rgb,229 57 53) / 0.35)",
        }}
      >
        <div className="inline-flex items-center gap-2 text-xs text-yellow-200/80">
          {icon}
          <span className="uppercase tracking-wider">{label}</span>
        </div>
        <div className="text-sm font-semibold text-yellow-100">{value}</div>
      </div>
    </div>
  );
}

function OverlayEffect({
  variant,
  cssVar,
}: {
  variant: OverlayVariant;
  cssVar?: React.CSSProperties;
}) {
  if (variant === "katana") {
    return (
      <motion.div
        className="pointer-events-none fixed inset-0 z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={cssVar}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(800px circle at center, rgb(var(--card-accent-rgb, 229 57 53)) / 0.25, transparent 70%)",
          }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.8, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        <Slash angle={-25} delay={0} dur={0.6} />
        <Slash angle={-25} delay={0.12} offset={40} dur={0.65} />
      </motion.div>
    );
  }
  if (variant === "katanaX") {
    return (
      <motion.div
        className="pointer-events-none fixed inset-0 z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={cssVar}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(800px circle at center, rgb(var(--card-accent-rgb, 229 57 53)) / 0.22, transparent 70%)",
          }}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1.9, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
        <Slash angle={-28} delay={0.05} dur={0.7} />
        <Slash angle={28} delay={0.18} dur={0.75} />
      </motion.div>
    );
  }
  if (variant === "katanaVertical") {
    return (
      <motion.div
        className="pointer-events-none fixed inset-0 z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={cssVar}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(800px circle at center, rgb(var(--card-accent-rgb, 229 57 53)) / 0.18, transparent 70%)",
          }}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1.8, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 1.0 }}
        />
        <motion.div
          className="absolute top-0 h-full w-px bg-white/85 shadow-[0_0_24px_rgba(255,255,255,0.9)]"
          style={{ left: "50%", transform: "translateX(-50%)" }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
        />
        <motion.div
          className="absolute top-0 h-full w-[3px] bg-[rgb(var(--card-accent-rgb,229_57_53))] shadow-[0_0_40px_rgb(229,57,53,0.95)]"
          style={{ left: "50%", transform: "translateX(-50%)" }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
        />
        {[-20, -8, 0, 8, 20].map((y, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-0.5 w-8 rounded bg-white/80"
            style={{ transform: `translate(-50%, -50%) translateY(${y}px)` }}
            initial={{ opacity: 0.9, x: 0 }}
            animate={{ opacity: 0, x: i < 2 ? -320 : i > 2 ? 320 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.06 * i, ease: "easeOut" }}
          />
        ))}
      </motion.div>
    );
  }
  if (variant === "katanaStorm") {
    return (
      <motion.div
        className="pointer-events-none fixed inset-0 z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={cssVar}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(800px circle at center, rgb(var(--card-accent-rgb, 229 57 53)) / 0.2, transparent 70%)",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1.7 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.0 }}
        />
        {[
          { a: -65, o: -60, d: 0.6, t: 0.0 },
          { a: -30, o: -20, d: 0.6, t: 0.08 },
          { a: 0, o: 0, d: 0.55, t: 0.12 },
          { a: 30, o: 20, d: 0.6, t: 0.18 },
          { a: 65, o: 60, d: 0.65, t: 0.24 },
        ].map((s, i) => (
          <Slash key={i} angle={s.a} offset={s.o} dur={s.d} delay={s.t} />
        ))}
      </motion.div>
    );
  }
  if (variant === "katanaArc") {
    return (
      <motion.div
        className="pointer-events-none fixed inset-0 z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={cssVar}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(700px circle at center, rgb(var(--card-accent-rgb, 229 57 53)) / 0.2, transparent 70%)",
          }}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1.8, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 1.1 }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "conic-gradient(from 220deg, rgb(var(--card-accent-rgb,229_57_53)) 0deg, transparent 140deg)",
          }}
          initial={{ rotate: -90, opacity: 0.6 }}
          animate={{ rotate: 270, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </motion.div>
    );
  }
  if (variant === "genjutsu") {
    return (
      <motion.div
        className="pointer-events-none fixed inset-0 z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={cssVar}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(700px circle at center, rgb(var(--card-accent-rgb, 229 57 53)) / 0.3, transparent 70%)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 2.2 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.3 }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            boxShadow:
              "0 0 60px 20px rgb(var(--card-accent-rgb, 229 57 53) / 0.5) inset",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.8, scale: 1.2 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rotate-12"
          style={{
            filter: "blur(2px)",
            boxShadow:
              "0 0 80px 10px rgb(var(--card-accent-rgb, 229 57 53) / 0.55)",
          }}
          initial={{ opacity: 0.7, scale: 0.3 }}
          animate={{ opacity: 0, scale: 6 }}
          exit={{ opacity: 0, scale: 0.3 }}
          transition={{ duration: 1.8 }}
        />
      </motion.div>
    );
  }
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[60]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={cssVar}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at center, rgb(var(--card-accent-rgb, 229 57 53)) / 0.35, transparent 70%)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 3, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.img
        src="https://r2.flowith.net/files/o/1758479295415-itachi_uchiha_mangekyou_sharingan_index_0@1024x1024.png"
        alt="Mangekyou Sharingan"
        className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 opacity-0"
        initial={{ rotate: 0, opacity: 0, scale: 0.5 }}
        animate={{ rotate: -720, opacity: 0.25, scale: 1 }}
        exit={{ opacity: 0, scale: 0.3 }}
        transition={{ duration: 1.6, ease: [0.68, -0.55, 0.27, 1.55] }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ borderColor: "rgb(var(--card-accent-rgb, 229 57 53))" }}
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 0.6, scale: 10 }}
        exit={{ opacity: 0, scale: 0.2 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ borderColor: "rgb(var(--card-accent-rgb, 229 57 53))" }}
        initial={{ opacity: 0.7, scale: 0.2 }}
        animate={{ opacity: 0, scale: 16 }}
        exit={{ opacity: 0, scale: 0.2 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
    </motion.div>
  );
}

function Slash({
  angle,
  delay = 0,
  offset = 0,
  dur = 0.55,
}: {
  angle: number;
  delay?: number;
  offset?: number;
  dur?: number;
}) {
  return (
    <>
      <motion.div
        className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-white/90 shadow-[0_0_24px_rgba(255,255,255,0.85)]"
        style={{ transform: `translateY(${offset}px) rotate(${angle}deg)` }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        exit={{ scaleX: 0, opacity: 0 }}
        transition={{ delay, duration: dur, ease: "easeOut" }}
      />
      <motion.div
        className="absolute left-0 top-1/2 h-[3px] w-full origin-left bg-[rgb(var(--card-accent-rgb,229_57_53))] shadow-[0_0_40px_rgb(229,57,53,0.95)]"
        style={{ transform: `translateY(${offset + 6}px) rotate(${angle}deg)` }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        exit={{ scaleX: 0, opacity: 0 }}
        transition={{ delay: delay + 0.05, duration: dur, ease: "easeOut" }}
      />
    </>
  );
}

function StatGlow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="relative rounded-lg p-[1px]">
      <div
        className="absolute inset-0 rounded-lg opacity-10"
        style={{ backgroundColor: "rgb(var(--card-accent-rgb,229 57 53))" }}
      />
      <div
        className="relative rounded-lg bg-[#19120c]/60 p-3"
        style={{
          border: "1px solid rgb(var(--card-accent-rgb,229 57 53) / 0.35)",
        }}
      >
        <div className="flex items-center gap-2 text-xs text-yellow-200/80">
          {icon}
          <span>{label}</span>
        </div>
        <div className="mt-1 text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}
