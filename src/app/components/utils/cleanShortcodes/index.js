export function cleanShortcodes(content, imageMap = {}) {
  if (!content) return "";

  let cleaned = content
    .replace(/&#8243;/g, '"')
    .replace(/»/g, '"')
    .replace(/«/g, '"')
    .replace(/&amp;/g, "&")

    // Texto
    .replace(/\[vc_column_text\]/g, '<div class="text-block">')
    .replace(/\[\/vc_column_text\]/g, "</div>")

    // Columnas
    .replace(
      /\[vc_column width="([^"]+)"\]/g,
      '<div class="col" style="width: $1">'
    )
    .replace(/\[vc_column[^\]]*\]/g, '<div class="col">')
    .replace(/\[\/vc_column\]/g, "</div>")

    // Filas
    .replace(/\[vc_row\]/g, '<div class="row">')
    .replace(/\[\/vc_row\]/g, "</div>")

    // Reemplazo de proporciones estilo "1/2" por porcentaje
    .replace(/style="width: (\d)\/(\d)"/g, (match, num, den) => {
      const percentage = (parseInt(num) / parseInt(den)) * 100;
      return `style="width: ${percentage}%"`;
    })

    // Imagenes
    .replace(
      /\[vc_single_image\s+image="(\d+)"\s+img_size="([^"]+)"\]/g,
      (match, id, size) => {
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
