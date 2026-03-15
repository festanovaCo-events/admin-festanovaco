import { GuestList, Guest } from "@/interfaces";

const generateGuests = (
  total: number,
  confirmed: number,
  startId: number = 1
): Guest[] => {
  const guests: Guest[] = [];
  const firstNames = [
    "Ana",
    "Carlos",
    "Laura",
    "Pedro",
    "Sofía",
    "Miguel",
    "Elena",
    "Diego",
    "Fernando",
    "Patricia",
    "María",
    "Juan",
    "Roberto",
    "Carmen",
    "Luis",
    "Isabel",
    "Javier",
    "Mónica",
    "Ricardo",
    "Gabriela",
    "Alejandro",
    "Andrea",
    "Daniel",
    "Paula",
    "Andrés",
    "Valentina",
    "Sergio",
    "Camila",
    "Mario",
    "Natalia",
    "José",
    "Lucía",
    "David",
    "Mariana",
    "Francisco",
    "Daniela",
    "Manuel",
    "Carolina",
    "Antonio",
    "Sara",
    "Rafael",
    "Elena",
    "Jorge",
    "Adriana",
    "Pablo",
    "Verónica",
    "Alberto",
    "Claudia",
    "Eduardo",
    "Rosa",
  ];
  const lastNames = [
    "Martínez",
    "Rodríguez",
    "Sánchez",
    "López",
    "Hernández",
    "Torres",
    "Vega",
    "Morales",
    "Ruiz",
    "Jiménez",
    "González",
    "Pérez",
    "García",
    "Fernández",
    "Gómez",
    "Díaz",
    "Álvarez",
    "Moreno",
    "Muñoz",
    "Romero",
    "Alonso",
    "Gutiérrez",
    "Navarro",
    "Torres",
    "Domínguez",
    "Vázquez",
    "Ramos",
    "Gil",
    "Ramírez",
    "Serrano",
    "Blanco",
    "Suárez",
    "Molina",
    "Morales",
    "Ortega",
    "Delgado",
    "Castro",
    "Ortiz",
    "Rubio",
    "Marín",
    "Sanz",
    "Iglesias",
    "Nuñez",
    "Medina",
    "Garrido",
    "Cortés",
    "Castillo",
    "Lozano",
    "Guerrero",
    "Cano",
  ];

  for (let i = 0; i < confirmed; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName =
      lastNames[Math.floor(i / firstNames.length) % lastNames.length];
    const confirmedDate = new Date(2024, 0, 15 + (i % 30));
    confirmedDate.setHours(10 + (i % 12), (i * 5) % 60);

    const hasExtraSeats = i % 3 === 0;
    const numberOfSeats = hasExtraSeats ? (i % 3) + 2 : 1;

    const subGuests =
      hasExtraSeats && numberOfSeats > 1
        ? Array.from({ length: numberOfSeats - 1 }, (_, subIndex) => {
            const subFirstName =
              firstNames[(i + subIndex + 10) % firstNames.length];
            const subLastName =
              lastNames[
                Math.floor((i + subIndex + 5) / firstNames.length) %
                  lastNames.length
              ];
            return {
              id: `sg${startId + i}-${subIndex}`,
              name: `${subFirstName} ${subLastName}`,
              email: `${subFirstName.toLowerCase()}.${subLastName.toLowerCase()}${i}${subIndex}@example.com`,
              phone:
                subIndex % 2 === 0
                  ? `+52 555 ${String(300 + (subIndex % 700)).padStart(
                      3,
                      "0"
                    )} ${String(3000 + (subIndex % 7000)).padStart(4, "0")}`
                  : undefined,
            };
          })
        : undefined;

    guests.push({
      id: `g${startId + i}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
      phone: `+52 555 ${String(100 + (i % 900)).padStart(3, "0")} ${String(
        1000 + (i % 9000)
      ).padStart(4, "0")}`,
      confirmed: true,
      confirmedAt: confirmedDate.toISOString(),
      numberOfSeats,
      subGuests,
    });
  }

  const pending = total - confirmed;
  for (let i = 0; i < pending; i++) {
    const firstName = firstNames[(confirmed + i) % firstNames.length];
    const lastName =
      lastNames[
        Math.floor((confirmed + i) / firstNames.length) % lastNames.length
      ];

    const hasExtraSeats = i % 4 === 0;
    const numberOfSeats = hasExtraSeats ? (i % 2) + 2 : 1;

    const subGuests =
      hasExtraSeats && numberOfSeats > 1
        ? Array.from({ length: numberOfSeats - 1 }, (_, subIndex) => {
            const subFirstName =
              firstNames[(confirmed + i + subIndex + 10) % firstNames.length];
            const subLastName =
              lastNames[
                Math.floor((confirmed + i + subIndex + 5) / firstNames.length) %
                  lastNames.length
              ];
            return {
              id: `sg${startId + confirmed + i}-${subIndex}`,
              name: `${subFirstName} ${subLastName}`,
              email: `${subFirstName.toLowerCase()}.${subLastName.toLowerCase()}${
                confirmed + i
              }${subIndex}@example.com`,
            };
          })
        : undefined;

    guests.push({
      id: `g${startId + confirmed + i}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${
        confirmed + i
      }@example.com`,
      phone:
        i % 3 === 0
          ? `+52 555 ${String(200 + (i % 800)).padStart(3, "0")} ${String(
              2000 + (i % 8000)
            ).padStart(4, "0")}`
          : undefined,
      confirmed: false,
      numberOfSeats,
      subGuests,
    });
  }

  return guests;
};

export const MOCK_GUEST_LISTS: GuestList[] = [
  {
    id: "1",
    name: "Lista de Boda - María y Juan",
    eventType: "boda",
    owner: "María González",
    ownerEmail: "maria@example.com",
    createdAt: "2024-01-15T10:00:00Z",
    totalGuests: 150,
    confirmedGuests: 120,
    guests: generateGuests(150, 120, 1),
  },
  {
    id: "2",
    name: "Cumpleaños 30 - Roberto",
    eventType: "cumpleanos",
    owner: "Roberto Martínez",
    ownerEmail: "roberto@example.com",
    createdAt: "2024-02-01T08:00:00Z",
    totalGuests: 80,
    confirmedGuests: 65,
    guests: generateGuests(80, 65, 151),
  },
  {
    id: "3",
    name: "Aniversario - Familia García",
    eventType: "aniversario",
    owner: "Carmen García",
    ownerEmail: "carmen@example.com",
    createdAt: "2024-02-10T12:00:00Z",
    totalGuests: 200,
    confirmedGuests: 180,
    guests: generateGuests(200, 180, 231),
  },
];
