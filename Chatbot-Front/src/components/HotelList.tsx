import HotelCard from "./HotelCard.tsx";

interface Hotel {
  id: string;
  nombre: string;
  ciudad: string;
  precio: number;
  estrellas: number;
  imagen?: string;
  descripcion?: string;
}

interface Props {
  hoteles: Hotel[];
}

export default function HotelList({
  hoteles,
}: Props) {

  if (hoteles.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-md text-center text-gray-500">
        No hay hoteles para mostrar
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {hoteles.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
        />
      ))}

    </div>
  );
}