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
  hotel: Hotel;
}

export default function HotelCard({
  hotel,
}: Props) {

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">

      {hotel.imagen && (
        <img
          src={hotel.imagen}
          alt={hotel.nombre}
          className="w-full h-52 object-cover"
        />
      )}

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {hotel.nombre}
        </h2>

        <p className="text-gray-500 mt-1">
          📍 {hotel.ciudad}
        </p>

        <div className="mt-2">
          ⭐ {hotel.estrellas} estrellas
        </div>

        <div className="mt-3 text-2xl font-bold text-blue-600">
          ${hotel.precio} USD
        </div>

        {hotel.descripcion && (
          <p className="mt-4 text-gray-600 text-sm">
            {hotel.descripcion}
          </p>
        )}

      </div>

    </div>
  );
}