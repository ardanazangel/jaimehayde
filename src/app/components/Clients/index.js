import Image from "next/image";

export default function Clients() {
  return (
    <section id="clients">
      <h3>Algunos clientes</h3>
      <ul id="lista-clientes">
        <li>
          <Image
            src={"/assets/clientes/bbva.png"}
            width={200}
            height={100}
            alt="Logo BBVA"
          />
        </li>
        <li>
          <Image
            src={"/assets/clientes/bizkaia.png"}
            width={200}
            height={100}
            alt="Logo Bizkaia"
          />
        </li>
        <li>
          <Image
            src={"/assets/clientes/cajarural.png"}
            width={200}
            height={100}
            alt="Logo Caja Rural"
          />
        </li>
        <li>
          <Image
            src={"/assets/clientes/canva.png"}
            width={200}
            height={100}
            alt="Logo Canva"
          />
        </li>
        <li>
          <Image
            src={"/assets/clientes/generalitatvalenciana.png"}
            width={200}
            height={100}
            alt="Logo Generalitat Valenciana"
          />
        </li>
        <li>
          <Image
            src={"/assets/clientes/getxo.png"}
            width={200}
            height={100}
            alt="Logo Getxo"
          />
        </li>
        <li>
          <Image
            src={"/assets/clientes/grindr.png"}
            width={200}
            height={100}
            alt="Logo Grindr"
          />
        </li>
        <li>
          <Image
            src={"/assets/clientes/hollywoodreporter.png"}
            width={200}
            height={100}
            alt="Logo Hollywood Reporter"
          />
        </li>
        <li>
          <Image
            src={"/assets/clientes/huffpost.png"}
            width={200}
            height={100}
            alt="Logo Huffpost"
          />
        </li>
        <li>
          <Image
            src={"/assets/clientes/klingit.png"}
            width={200}
            height={100}
            alt="Logo Klingit"
          />
        </li>
        <li>
          <Image
            src={"/assets/clientes/lingokids.png"}
            width={200}
            height={100}
            alt="Logo Lingo Kids"
          />
        </li>
        <li>
          <Image
            src={"/assets/clientes/siwon.png"}
            width={200}
            height={100}
            alt="Logo Siwon"
          />
        </li>
        <li>
          <Image
            src={"/assets/clientes/streamelements.png"}
            width={200}
            height={100}
            alt="Logo Stream Elements"
          />
        </li>
        <li>
          <Image
            src={"/assets/clientes/tetu.png"}
            width={200}
            height={100}
            alt="Logo Tetu"
          />
        </li>
        <li>
          <Image
            src={"/assets/clientes/warner.png"}
            width={200}
            height={100}
            alt="Logo Warner Music"
          />
        </li>
        <li>
          <Image
            src={"/assets/clientes/xbox.png"}
            width={200}
            height={100}
            alt="Logo Xbox"
          />
        </li>
      </ul>
    </section>
  );
}
