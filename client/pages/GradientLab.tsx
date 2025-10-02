import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  gradientPresets,
  getGradientBackground,
  useGradientTheme,
} from "@/hooks/use-gradient-theme";
import type { GradientPresetId } from "@/hooks/use-gradient-theme";
import { cn } from "@/lib/utils";
import { Check, Paintbrush } from "lucide-react";

const ACCENT_SAMPLES = [
  { name: "Escarlate", rgb: "229 57 53" },
  { name: "Índigo", rgb: "70 90 170" },
  { name: "Esmeralda", rgb: "29 135 114" },
];

function GradientPreview({ preset, accent }: { preset: GradientPresetId; accent: string }) {
  const background = getGradientBackground(preset, accent);
  return (
    <div
      className="rounded-xl border border-white/5 p-4 text-sm shadow-sm"
      style={{
        background,
      }}
    >
      <div className="flex items-center justify-between text-xs font-semibold text-white/80">
        <span>{accent.replace(/\s+/g, ", ")}</span>
        <span>{preset}</span>
      </div>
      <div className="mt-6 grid gap-2 text-white/90">
        <div className="text-sm font-semibold">Titulo do Anime</div>
        <p className="text-xs text-white/75">
          Pré-visualização do gradiente aplicado com a cor dominante selecionada.
        </p>
      </div>
    </div>
  );
}

export default function GradientLab() {
  const { preset, setPreset } = useGradientTheme();

  return (
    <Layout>
      <Container className="py-8">
        <div className="flex flex-col gap-6 pb-8">
          <div className="flex items-center gap-3 text-sm text-accent">
            <Paintbrush className="h-5 w-5" />
            <span>Laboratório de Degradês</span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Escolha o brilho das cartas</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Teste variações de degradê para o interior dos cards. Selecionamos opções que
              equilibram o destaque dourado e combinações puras derivadas da cor predominante do pôster.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>Pré-visualizações com exemplos de cores dominantes:</span>
            {ACCENT_SAMPLES.map((sample) => (
              <Badge key={sample.name} variant="outline" className="border-accent/30">
                {sample.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {gradientPresets.map((meta) => {
            const active = meta.id === preset;
            return (
              <button
                key={meta.id}
                className={cn(
                  "group flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/80 p-6 text-left transition-all",
                  active
                    ? "border-accent/70 shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
                    : "hover:border-accent/40 hover:bg-card/90",
                )}
                onClick={() => setPreset(meta.id)}
                type="button"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {meta.label}
                    </h2>
                    <p className="text-sm text-muted-foreground">{meta.description}</p>
                  </div>
                  {active ? (
                    <div className="flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1 text-sm font-semibold text-accent">
                      <Check className="h-4 w-4" />
                      Selecionado
                    </div>
                  ) : (
                    <div className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">
                      Clique para aplicar
                    </div>
                  )}
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {ACCENT_SAMPLES.map((sample) => (
                    <GradientPreview
                      key={sample.name}
                      preset={meta.id}
                      accent={sample.rgb}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                  <span>ID: {meta.id}</span>
                  <Button
                    variant={active ? "default" : "outline"}
                    size="sm"
                    onClick={(event) => {
                      event.stopPropagation();
                      setPreset(meta.id);
                    }}
                  >
                    {active ? "Aplicado" : "Aplicar"}
                  </Button>
                </div>
              </button>
            );
          })}
        </div>
      </Container>
    </Layout>
  );
}
