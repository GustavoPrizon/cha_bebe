const urls = import.meta.glob<string>("../assets/products/*.{jpg,jpeg,png,webp,gif}", {
  eager: true,
  query: "?url",
  import: "default",
});

const byFilename = new Map<string, string>();
for (const [path, url] of Object.entries(urls)) {
  const name = path.split("/").pop();
  if (name) byFilename.set(name, url);
}

/** Resolved URL from `src/assets/products/{filename}`, or undefined if missing. */
export function productImageUrl(filename: string): string | undefined {
  return byFilename.get(filename);
}
