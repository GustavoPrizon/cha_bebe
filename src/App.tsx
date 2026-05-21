import { useMemo, useState } from "react";
import { Gift, Info, Search, Sparkles } from "lucide-react";
import { PixCanvas } from "react-qrcode-pix";
import { clsx } from "clsx";
import { EVENT, PIX } from "./config";
import { PRODUCTS, type Product } from "./data/products";
import { formatBRL } from "./utils/formatBRL";
import { productImageUrl } from "./utils/productImageUrl";

function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter((p) => {
      const hay = `${p.name} ${p.description}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  async function copyPixKey() {
    try {
      await navigator.clipboard.writeText(PIX.key);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore; user can still select and copy manually
    }
  }

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/80 backdrop-blur">
        <div className="container-shell flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-full bg-[rgb(var(--fg))] text-white">
              <Sparkles className="size-5" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold">{EVENT.siteTitle}</div>
              <div className="text-xs text-gray-500">{EVENT.siteSubtitle}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-gray-600 sm:flex">
            <a className="hover:text-gray-900" href="#como-funciona">
              Como funciona
            </a>
            <a className="hover:text-gray-900" href="#presentes">
              Lista de presentes
            </a>
            <a className="hover:text-gray-900" href="#pix">
              Pix
            </a>
          </nav>

          <a className="btn-primary" href="#presentes">
            <Gift className="size-4" aria-hidden="true" />
            Escolher presente
          </a>
        </div>
      </header>

      <main id="top">
        <section className="container-shell pt-6 sm:pt-10">
          <div className="relative overflow-hidden rounded-3xl border border-[rgb(var(--border))] bg-white shadow-sm">
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 20% 10%, rgba(251,113,133,0.18), transparent 55%), radial-gradient(circle at 80% 20%, rgba(245,158,11,0.12), transparent 55%)",
              }}
            />
            <img
              src="/banner.jpeg"
              alt={`Convite do chá da Helena: ${EVENT.babyName}`}
              className="relative mx-auto block w-full object-contain bg-[rgb(var(--bg))]"
              loading="eager"
              decoding="async"
            />
          </div>
        </section>

        <section className="section">
          <div className="container-shell gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-white px-4 py-2 text-xs text-gray-600">
                <Info className="size-4" aria-hidden="true" />
                {EVENT.dateLabel} • {EVENT.locationLabel}
              </p>
              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
                {EVENT.heroTitle}
              </h1>
              <p className="mt-4 whitespace-pre-line text-pretty text-base text-gray-600 sm:text-lg">
                {EVENT.heroDescription}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a className="btn-primary" href="#presentes">
                  Ver lista de presentes
                </a>
                <a className="btn-ghost" href="#pix">
                  Ver chave Pix
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="hairline" />

        <section id="como-funciona" className="section">
          <div className="container-shell">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Missões da Helena
            </h2>
            <p className="mt-3 max-w-2xl text-gray-600">
              Selecione um item na lista. O site mostra o valor e a chave Pix
              (celular) para você enviar o presente.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Missão 1",
                  body: "👶 Missão Fraldinha Feliz – R$ 65",
                },
                {
                  title: "Missão 2",
                  body: "🍼 Missão Barriguinha Cheia – R$ 80",
                },
                {
                  title: "Missão 3",
                  body: "😴 Missão Noite Tranquila – R$ 100",
                },
                {
                  title: "Missão 4",
                  body: "💛 Missão Papais Preparados – R$ 150",
                },
                {
                  title: "✨ Bônus ✨",
                  body: "💝 Contribuição livre – qualquer valor com carinho é bem-vindo",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="rounded-3xl border border-[rgb(var(--border))] bg-white p-6"
                >
                  <div className="text-sm font-semibold text-gray-900">
                    {s.title}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">{s.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="hairline" />

        <section id="presentes" className="section">
          <div className="container-shell">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                  Lista de presentes
                </h2>
                <p className="mt-2 text-gray-600">
                  Valores sugeridos. Você pode escolher qualquer item.
                </p>
              </div>

              <label className="relative w-full sm:w-80">
                <span className="sr-only">Buscar itens</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-full border border-[rgb(var(--border))] bg-white py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-[rgba(251,113,133,0.35)]"
                  placeholder="Buscar (fralda, banho, quarto...)"
                />
              </label>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => {
                const thumb = productImageUrl(p.imagem);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelected(p)}
                    className={clsx(
                      "group rounded-3xl border bg-white p-5 text-left transition hover:shadow-sm",
                      "border-[rgb(var(--border))]",
                    )}
                  >
                    <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt=""
                          // 1. Trocamos object-cover por object-contain
                          // 2. Dica de Sênior: Adicionei um 'p-2' (padding) para a imagem não "grudar" na borda do card, dá um respiro visual melhor.
                          className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-[1.02]"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div
                          className="h-full w-full bg-gradient-to-br from-rose-100/90 to-amber-50/90"
                          aria-hidden
                        />
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {p.name}
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                          {p.description}
                        </div>
                      </div>
                      <div className="shrink-0 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-3 py-2 text-xs font-semibold text-gray-900">
                        {formatBRL(p.price)}
                      </div>
                    </div>

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gray-900">
                      Selecionar
                      <span className="text-gray-400 transition group-hover:translate-x-0.5">
                        →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="mt-10 rounded-3xl border border-[rgb(var(--border))] bg-white p-8 text-sm text-gray-600">
                Nenhum item encontrado. Tente outra busca.
              </div>
            )}
          </div>
        </section>

        <div className="hairline" />

        <section id="pix" className="section">
          <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Pix para presentear
              </h2>
              <p className="mt-3 max-w-xl text-gray-600">
                ✨ E claro, se preferir, você também pode nos presentear da
                forma tradicional. A sua presença, carinho e apoio já significam
                muito para nós 💛 Com carinho, André e Jocimara
              </p>

              <div className="mt-8 rounded-3xl border border-[rgb(var(--border))] bg-white p-6">
                <div className="text-xs text-gray-500">Chave Pix</div>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <code className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 py-3 text-sm text-gray-900">
                    {PIX.keyCellphone}
                  </code>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={copyPixKey}
                  >
                    {copied ? "Copiado" : "Copiar chave"}
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {PIX.keyTypeLabel}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[rgb(var(--border))] bg-white p-6">
              <div className="text-sm font-semibold text-gray-900">QR Code</div>
              <p className="mt-2 text-sm text-gray-600">
                Aponte a câmera do seu banco para facilitar.
              </p>
              <div className="mt-6 flex items-center justify-center rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-8">
                <div className="overflow-hidden rounded-xl bg-white p-2">
                  <PixCanvas
                    pixkey={PIX.keyCellphone}
                    merchant={PIX.receiverName}
                    city={PIX.receiverCity}
                    ignoreErrors
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[rgb(var(--border))] bg-white">
        <div className="container-shell flex flex-col gap-4 py-10 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-medium text-gray-900">{EVENT.footerTitle}</div>
            <div className="mt-1">{EVENT.footerSubtitle}</div>
          </div>
          <div className="text-xs">
            Dica: aperte <span className="kbd">Ctrl</span> +{" "}
            <span className="kbd">F</span> para buscar itens rapidamente.
          </div>
        </div>
      </footer>

      <PixModal
        open={!!selected}
        product={selected ?? undefined}
        pixKey={PIX.key}
        receiverName={PIX.receiverName}
        receiverCity={PIX.receiverCity}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

function PixModal({
  open,
  product,
  pixKey,
  receiverName,
  receiverCity,
  onClose,
}: {
  open: boolean;
  product?: Product;
  pixKey: "11942800216";
  receiverName: string;
  receiverCity: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  if (!open || !product) return null;

  const modalImg = productImageUrl(product.imagem);

  async function copyAll() {
    const p = product!;
    const text = `Presente: ${p.name}\nValor: ${formatBRL(
      p.price,
    )}\nPix: ${pixKey}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center p-4"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Fechar"
      />

      {/* A MÁGICA ACONTECE AQUI: max-h-[calc(100dvh-2rem)] e overflow-y-auto */}
      <div className="relative w-full max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl border border-[rgb(var(--border))] bg-white shadow-xl">
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-xs text-gray-500">Você selecionou</div>
              <div className="mt-1 text-lg font-semibold text-gray-900">
                {product.name}
              </div>
              <div className="mt-1 text-sm text-gray-600">
                {product.description}
              </div>
            </div>
            <div className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 py-2 text-sm font-semibold text-gray-900">
              {formatBRL(product.price)}
            </div>
          </div>

          {modalImg ? (
            <div className="mt-5 overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]">
              <img
                src={modalImg}
                alt=""
                className="max-h-52 w-full object-contain p-2"
                loading="eager"
                decoding="async"
              />
            </div>
          ) : null}

          <div className="mt-6 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-4">
            <div className="text-xs text-gray-500">Chave Pix (celular)</div>
            <code className="mt-2 block rounded-xl border border-[rgb(var(--border))] bg-white px-4 py-3 text-sm text-gray-900">
              {pixKey}
            </code>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <button type="button" className="btn-primary" onClick={copyAll}>
                {copied ? "Copiado" : "Copiar tudo"}
              </button>
              <button type="button" className="btn-ghost" onClick={onClose}>
                Fechar
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[rgb(var(--border))] bg-white p-4">
            <div className="text-xs text-gray-500">QR Code (chave Pix)</div>
            <div className="mt-3 flex items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-6">
              <div className="overflow-hidden rounded-xl bg-white p-2">
                <PixCanvas
                  pixkey={pixKey}
                  merchant={receiverName}
                  city={receiverCity}
                  amount={product.price}
                  ignoreErrors
                />
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              Se seu banco permitir, informe o valor manualmente:{" "}
              <span className="font-medium text-gray-900">
                {formatBRL(product.price)}
              </span>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
