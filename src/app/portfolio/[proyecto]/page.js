import { getData } from "@/app/components/utils/getData";
import Image from "next/image";

export async function generateStaticParams() {
  const data = await getData();

  return data.map((proyecto) => ({
    proyecto: proyecto.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { proyecto } = await params;
  const data = await getData();
  const proyectoData = data.find((item) => item.slug === proyecto);

  return {
    title:
      proyectoData?.title.rendered + " " + "- Jaime Hayde" ||
      "Proyecto no encontrado",
    description:
      proyectoData?.excerpt?.rendered || "Detalles del proyecto seleccionado",
  };
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

  const processedContent = proyectoData.content.rendered
    .replace(/data-src="/g, 'src="')
    .replace(/class="([^"]*?)lazyload([^"]*?)"/g, 'class="$1$2"')
    .replace(/src="data:image\/gif;base64,[^"]*"/g, "")
    // Simplificar clases de Visual Composer
    .replace(/vc_row wpb_row vc_row-fluid/g, "fila")
    .replace(/wpb_column vc_column_container/g, "columna")
    .replace(/vc_col-sm-(\d+)/g, "")
    .replace(/wpb_single_image wpb_content_element/g, "imagen")
    .replace(/wpb_text_column wpb_content_element/g, "texto")
    .replace(/vc_align_center/g, "centrado")
    // Limpiar atributos innecesarios de imágenes
    .replace(/data-srcset="[^"]*"/g, "")
    .replace(/data-sizes="[^"]*"/g, "")
    .replace(/decoding="async"/g, "")
    .replace(/style="[^"]*"/g, "")
    .replace(
      /class="vc_single_image-img attachment-full [^"]*"/g,
      'class="inner-img"'
    )
    .replace(/width="\d+"/g, "")
    .replace(/height="\d+"/g, "")
    // Agregar loading="lazy" a todas las imágenes
    .replace(/<img([^>]*?)>/g, (match) => {
      // Solo agregar si no tiene ya loading="lazy"
      if (match.includes("loading=")) {
        return match;
      }
      return match.replace(">", ' loading="lazy">');
    });

  return (
    <main>
      <section id="inner-header">
        <h1>{proyectoData.title.rendered}</h1>
        {proyectoData._embedded?.["wp:featuredmedia"]?.[0] && (
          <Image
            src={proyectoData._embedded["wp:featuredmedia"][0].source_url}
            alt={
              proyectoData.title.rendered + " " + "imagen destacada" ||
              "Imagen destacada"
            }
            width={600}
            height={300}
          />
        )}
      </section>
      <section id="inner-content">
        <div dangerouslySetInnerHTML={{ __html: processedContent }} />
      </section>
    </main>
  );
}
