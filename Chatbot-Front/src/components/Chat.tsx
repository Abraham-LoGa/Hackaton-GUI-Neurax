// // src/components/Chat.tsx

// import {
//   CopilotKit,
//   useCopilotAction,
// } from "@copilotkit/react-core";

// import {
//   CopilotChat,
// } from "@copilotkit/react-ui";

// import { useState } from "react";

// import HotelList from "./HotelList.tsx";

// const hotelesMock = [
//   {
//     id: "1",
//     nombre: "Ocean Paradise Resort",
//     ciudad: "Cancún",
//     precio: 220,
//     estrellas: 5,
//     imagen:
//       "https://images.unsplash.com/photo-1566073771259-6a8506099945",
//     descripcion:
//       "Hotel frente al mar con desayuno incluido y alberca infinita",
//   },
//   {
//     id: "2",
//     nombre: "Sunset Beach Hotel",
//     ciudad: "Playa del Carmen",
//     precio: 180,
//     estrellas: 4,
//     imagen:
//       "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
//     descripcion:
//       "Ideal para vacaciones familiares cerca de la playa",
//   },
//   {
//     id: "3",
//     nombre: "Luxury Sky Resort",
//     ciudad: "Los Cabos",
//     precio: 350,
//     estrellas: 5,
//     imagen:
//       "https://images.unsplash.com/photo-1582719508461-905c673771fd",
//     descripcion:
//       "Resort premium con spa, vista al mar y restaurantes gourmet",
//   },
// ];

// export default function Chat() {

//   const [hoteles, setHoteles] = useState<any[]>([]);

//   useCopilotAction({
//     name: "buscarHoteles",

//     description:
//       "Busca hoteles según las necesidades del usuario",

//     parameters: [
//       {
//         name: "requerimientos",
//         type: "string",
//         description:
//           "Preferencias del usuario",
//         required: true,
//       },
//     ],

//     handler: async ({ requerimientos }) => {

//       console.log("Requerimientos:", requerimientos);

//       // Simulación de delay API
//       await new Promise((resolve) =>
//         setTimeout(resolve, 1500)
//       );

//       // Simulación simple de filtro
//       let resultados = hotelesMock;

//       if (
//         requerimientos.toLowerCase().includes("cancún")
//       ) {
//         resultados = hotelesMock.filter((hotel) =>
//           hotel.ciudad
//             .toLowerCase()
//             .includes("cancún")
//         );
//       }

//       if (
//         requerimientos.toLowerCase().includes("lujo")
//       ) {
//         resultados = hotelesMock.filter(
//           (hotel) => hotel.estrellas >= 5
//         );
//       }

//       setHoteles(resultados);

//       return `
//         Encontré ${resultados.length}
//         hoteles que coinciden con la búsqueda.
//       `;
//     },
//   });

//   return (
//     <CopilotKit runtimeUrl="/api/copilotkit">

//       <div className="min-h-screen bg-gray-100 p-6">

//         <div className="max-w-7xl mx-auto">

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//             {/* CHAT */}

//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[700px]">

//               <CopilotChat
//                 instructions={`
//                   Eres un asistente experto en hoteles.

//                   Siempre usa la acción buscarHoteles
//                   para recomendar hoteles.
//                 `}
//                 labels={{
//                   title: "Hotel Assistant",
//                   initial:
//                     "Hola 👋 ¿Qué tipo de hotel deseas?",
//                 }}
//               />

//             </div>

//             {/* RESULTADOS */}

//             <div>

//               <h2 className="text-3xl font-bold mb-6">
//                 Hoteles recomendados
//               </h2>

//               <HotelList hoteles={hoteles} />

//             </div>

//           </div>

//         </div>

//       </div>

//     </CopilotKit>
//   );
// }

import { useState } from "react";

import HotelList from "./HotelList";

const hotelesMock = [
  {
    id: "1",
    nombre: "Ocean Paradise Resort",
    ciudad: "Cancún",
    precio: 220,
    estrellas: 5,
    imagen:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    descripcion:
      "Hotel frente al mar con desayuno incluido",
  },
  {
    id: "2",
    nombre: "Sunset Beach Hotel",
    ciudad: "Playa del Carmen",
    precio: 180,
    estrellas: 4,
    imagen:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    descripcion:
      "Perfecto para vacaciones familiares",
  },
  {
    id: "3",
    nombre: "Luxury Sky Resort",
    ciudad: "Los Cabos",
    precio: 350,
    estrellas: 5,
    imagen:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd",
    descripcion:
      "Resort premium con spa",
  },
];

export default function Chat() {

  const [mensaje, setMensaje] = useState("");

  const [hoteles, setHoteles] = useState<any[]>([]);

  const buscarHoteles = async () => {

    // Simular delay API
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    let resultados = hotelesMock;

    const texto = mensaje.toLowerCase();

    if (texto.includes("cancún")) {
      resultados = resultados.filter((hotel) =>
        hotel.ciudad
          .toLowerCase()
          .includes("cancún")
      );
    }

    if (texto.includes("lujo")) {
      resultados = resultados.filter(
        (hotel) => hotel.estrellas >= 5
      );
    }

    if (texto.includes("económico")) {
      resultados = resultados.filter(
        (hotel) => hotel.precio < 200
      );
    }

    setHoteles(resultados);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CHAT */}

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h1 className="text-3xl font-bold mb-6">
              Hotel Assistant
            </h1>

            <textarea
              value={mensaje}
              onChange={(e) =>
                setMensaje(e.target.value)
              }
              placeholder="Describe el hotel que buscas..."
              className="w-full border rounded-xl p-4 h-40 resize-none"
            />

            <button
              onClick={buscarHoteles}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
            >
              Buscar hoteles
            </button>

          </div>

          {/* RESULTADOS */}

          <div>

            <h2 className="text-3xl font-bold mb-6">
              Hoteles recomendados
            </h2>

            <HotelList hoteles={hoteles} />

          </div>

        </div>

      </div>

    </div>
  );
}