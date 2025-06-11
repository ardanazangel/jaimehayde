import { getData } from "@/app/components/utils/getData";
import Image from "next/image";

// Generación de rutas estáticas para cada proyecto
export async function generateStaticParams() {
  const data = await getData();

  return data.map((proyecto) => ({
    proyecto: proyecto.slug,
  }));
}

// Generación de metadatos para SEO
export async function generateMetadata({ params }) {
  const { proyecto } = await params;
  const data = await getData();
  const proyectoData = data.find((item) => item.slug === proyecto);

  return {
    title: proyectoData?.title?.rendered
      ? `${proyectoData.title.rendered} - Jaime Hayde`
      : "Proyecto no encontrado",
    description:
      proyectoData?.excerpt?.rendered || "Detalles del proyecto seleccionado",
  };
}

const normalizeQuotes = (str) =>
  str.replace(/&raquo;|»|“|”|&#8243;/g, '"').replace(/&laquo;/g, '"');

const getImageById = async (id) => {
  try {
    const res = await fetch(
      `https://shop.jaimehayde.com/wp-json/wp/v2/media/${id}`
    );
    if (!res.ok) throw new Error("No se pudo obtener la imagen");
    const data = await res.json();
    return data.source_url;
  } catch (error) {
    console.error("Error obteniendo la imagen:", error);
    return null;
  }
};

const parseContent = async (rawContent) => {
  const content = normalizeQuotes(rawContent);
  const regex =
    /\[vc_row\](.*?)\[\/vc_row\]|\[vc_column.*?\](.*?)\[\/vc_column\]|\[vc_column_text.*?\](.*?)\[\/vc_column_text\]|\[vc_single_image.*?image="(\d+)".*?\]/g;

  const elements = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    if (match[1]) {
      elements.push(
        <div className="vc-row" key={elements.length}>
          {await parseContent(match[1])}
        </div>
      );
    } else if (match[2]) {
      elements.push(
        <div className="vc-column" key={elements.length}>
          {await parseContent(match[2])}
        </div>
      );
    } else if (match[3]) {
      elements.push(
        <p
          key={elements.length}
          dangerouslySetInnerHTML={{ __html: match[3] }}
        />
      );
    } else if (match[4]) {
      const imageUrl = await getImageById(match[4]);
      if (imageUrl) {
        elements.push(
          <Image
            key={elements.length}
            src={imageUrl}
            alt="Imagen del proyecto"
            width={600}
            height={300}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCABdAF0DASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAQACA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDAIZUJJQEEEQQCSAAgHQJIBIKIggiCASAIEA2kkACFEQgJCBAgECAbSSABCiSQFJAgQASQNghBBJRJICkgQIAJIGwQgEkokkBSQIEAAQD/2Q=="
          />
        );
      } else {
        elements.push(<p key={elements.length}>Imagen no disponible</p>);
      }
    }
  }

  return elements;
};

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

  const parsedContent = await parseContent(proyectoData.content.rendered);

  return (
    <main>
      <section id="inner-content">
        <h1>{proyectoData.title.rendered}</h1>
        {parsedContent}
      </section>
    </main>
  );
}
