import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export function Container({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[#020207] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <Container className="flex h-16 items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 font-semibold text-white">
            <img
              src="https://r2.flowith.net/files/o/1758206861341-itachi_mangekyou_sharingan_icon_index_1@1024x1024.png"
              alt="Mangekyou Sharingan"
              className="h-8 w-8 animate-[spin_20s_linear_infinite]"
            />
            <span className="text-lg">Tio Itachi</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <a
              href="#patrocinados"
              className="hover:text-accent-foreground/80 text-foreground/90"
            >
              Patrocinados
            </a>
            <a
              href="#sugestoes"
              className="hover:text-accent-foreground/80 text-foreground/90"
            >
              Sugestões
            </a>
            <a
              href="#finalizados"
              className="hover:text-accent-foreground/80 text-foreground/90"
            >
              Finalizados
            </a>
          </nav>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>Notas baseadas na comunidade</span>
          </div>
        </Container>
      </header>
      <main className="pb-16 pt-8">
        <Container>{children}</Container>
      </main>
      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        <Container>
          <p>© 2025 Tio Itachi. Todos os direitos reservados.</p>
        </Container>
      </footer>
    </div>
  );
}
