import { getData } from "@/app/components/utils/getData";

function decodeHtmlEntities(text) {
  if (typeof window === "undefined") {
    // Node.js: decodificar manualmente las entidades más comunes
    return text
      .replace(/&#8243;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/[«»]/g, '"');
  } else {
    // Navegador: usar textarea para decodificar entidades
    const txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value.replace(/[«»]/g, '"');
  }
}

// Extrae los IDs de imágenes del contenido con shortcodes normalizados
function extractImageIds(content) {
  const regex = /\[vc_single_image\s+image="(\d+)"\s+img_size="[^"]+"\]/g;
  const ids = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    ids.push(match[1]);
  }
  return ids;
}

function cleanShortcodes(content, imageMap = {}) {
  if (!content) return "";

  let cleaned = content
    .replace(/\[vc_column_text\]/g, '<div class="text-block">')
    .replace(/\[\/vc_column_text\]/g, "</div>")
    .replace(/\[vc_column width="([^"]+)"\]/g, (match, width) => {
      // Convertir fracciones a porcentajes
      const fractionToPercentage = (fraction) => {
        const fractionMap = {
          "1/1": "100%",
          "1/2": "50%",
          "1/3": "33.33%",
          "2/3": "66.67%",
          "1/4": "25%",
          "3/4": "75%",
          "1/5": "20%",
          "2/5": "40%",
          "3/5": "60%",
          "4/5": "80%",
          "1/6": "16.67%",
          "5/6": "83.33%",
        };

        return fractionMap[fraction] || fraction;
      };

      const percentage = fractionToPercentage(width);
      return `<div class="col" style="width: ${percentage}">`;
    })
    .replace(/\[vc_column[^\]]*\]/g, '<div class="col">')
    .replace(/\[\/vc_column\]/g, "</div>")
    .replace(/\[vc_row\]/g, '<div class="row">')
    .replace(/\[\/vc_row\]/g, "</div>")
    .replace(
      /\[vc_single_image\s+image="(\d+)"\s+img_size="([^"]+)"\]/g,
      (m, id, size) => {
        const url = imageMap[id];
        if (url) {
          return `<img src="${url}" class="img-${size}" />`;
        } else {
          return `<!-- Imagen con ID ${id} no encontrada -->`;
        }
      }
    );

  return cleaned;
}

export default async function Proyecto({ params }) {
  const { proyecto } = await params;
  const data = await getData();

  const proyectoData = data.find((item) => item.slug === proyecto);

  if (!proyectoData) {
    return (
      <main>
        <h1>Proyecto no encontrado</h1>
      </main>
    );
  }

  // Decodificar entidades y normalizar comillas
  const normalizedContent = decodeHtmlEntities(proyectoData.content.rendered);

  // Extraer IDs de imagen
  const imageIds = extractImageIds(normalizedContent);

  // Fetch para obtener URLs de imágenes (map id -> url)
  const imageMap = {};

  await Promise.all(
    imageIds.map(async (id) => {
      try {
        const res = await fetch(
          `https://api.pruebaensilencio.es/wp-json/wp/v2/media/${id}`
        );
        if (res.ok) {
          const json = await res.json();
          imageMap[id] = json.source_url || "";
        } else {
          imageMap[id] = "";
        }
      } catch (error) {
        imageMap[id] = "";
      }
    })
  );

  // Limpiar shortcodes con las URLs ya cargadas
  const processedContent = cleanShortcodes(normalizedContent, imageMap);

  return (
    <main>
      <section id="inner-header">
        <h1>{proyectoData.title.rendered}</h1>
      </section>
      <div dangerouslySetInnerHTML={{ __html: processedContent }} />
    </main>
  );
}
