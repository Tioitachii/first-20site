export type RGB = { r: number; g: number; b: number };
export type HSL = { h: number; s: number; l: number };

export function rgbToHsl({ r, g, b }: RGB): HSL {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hex(n: number) {
  return n.toString(16).padStart(2, "0");
}

export function rgbToHex({ r, g, b }: RGB) {
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

export function hashToPaletteColor(str: string): RGB {
  const colors: RGB[] = [
    { r: 229, g: 57, b: 53 }, // red
    { r: 52, g: 199, b: 89 }, // green
    { r: 10, g: 132, b: 255 }, // blue
    { r: 255, g: 159, b: 10 }, // orange
    { r: 191, g: 90, b: 242 }, // purple
    { r: 255, g: 55, b: 95 }, // pink
    { r: 100, g: 210, b: 255 }, // cyan
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash << 5) - hash + str.charCodeAt(i);
  const idx = Math.abs(hash) % colors.length;
  return colors[idx];
}

export async function getDominantColor(imageUrl: string): Promise<RGB> {
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.crossOrigin = "anonymous";
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = imageUrl;
    });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No 2d context");
    const w = 50;
    const h = Math.max(1, Math.round((img.height / img.width) * w));
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);
    let r = 0, g = 0, b = 0, count = 0;
    for (let p = 0; p < data.length; p += 4) {
      const a = data[p + 3];
      if (a < 125) continue;
      r += data[p];
      g += data[p + 1];
      b += data[p + 2];
      count++;
    }
    if (!count) throw new Error("No opaque pixels");
    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);
    return { r, g, b };
  } catch {
    return hashToPaletteColor(imageUrl);
  }
}

export function rgbToCssRgb(rgb: RGB) {
  return `${rgb.r} ${rgb.g} ${rgb.b}`; // space separated for rgb(var(--x) / a)
}
