import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "mock");

function writeJson(rel, data) {
  const full = path.join(root, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, `${JSON.stringify(data, null, 2)}\n`);
}

const loginSuccess = {
  success: true,
  data: {
    id: "user-mock-1",
    name: "Usuario Demo",
    email: "demo@ejemplo.com",
    isActive: true,
    password: "",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    deletedAt: "",
    token: "mock-jwt-token",
    accounts: [
      {
        id: "account-mock-1",
        owner: null,
        ownerId: "user-mock-1",
        isActive: true,
        members: [],
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        deletedAt: "",
      },
    ],
  },
};

writeJson("auth-login/cases/success.json", loginSuccess);
writeJson("auth-login/cases/error-401.json", {
  success: false,
  data: null,
  message: "Invalid credentials",
});

writeJson("auth-register/cases/success.json", {
  success: true,
  data: {
    id: "user-mock-2",
    name: "Nuevo Usuario",
    email: "nuevo@ejemplo.com",
    isActive: true,
    password: "",
    createdAt: "2026-01-02T00:00:00.000Z",
    updatedAt: "2026-01-02T00:00:00.000Z",
    deletedAt: "",
    token: "mock-jwt-token-register",
    accounts: [],
  },
});
writeJson("auth-register/cases/error-400.json", {
  success: false,
  data: null,
  message: "Email already registered",
});

function asset(id, eventId, kind, url, position) {
  return {
    id,
    event_id: eventId,
    kind,
    url,
    position,
    provider: "mock",
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    deleted_at: null,
  };
}

function eventData(partial, { detail = false } = {}) {
  const base = {
    id: partial.id,
    account_id: "account-mock-1",
    account: null,
    address: partial.address,
    capacity: partial.capacity,
    created_at: partial.created_at,
    created_by: partial.created_by,
    deleted_at: null,
    ends_at: partial.ends_at,
    is_public: true,
    mode: "presential",
    starts_at: partial.starts_at,
    status: partial.status,
    template_id: null,
    title: partial.title,
    type: partial.type,
    updated_at: partial.created_at,
    assets: null,
    config: null,
  };

  if (!detail) {
    base.assets = [
      asset(`a-${partial.id}-banner`, partial.id, "banner", partial.banner, 0),
    ];
    return base;
  }

  base.assets = [
    asset(`a-${partial.id}-banner`, partial.id, "banner", partial.banner, 0),
    ...partial.gallery.map((url, i) =>
      asset(`a-${partial.id}-g${i}`, partial.id, "carousel_image", url, i + 1),
    ),
    ...(partial.music
      ? [asset(`a-${partial.id}-audio`, partial.id, "audio", partial.music, 99)]
      : []),
  ];
  base.config = {
    id: `cfg-${partial.id}`,
    eventId: partial.id,
    metadata: {
      quote: partial.quote,
      wifeName: partial.wifeName || "",
      husbandName: partial.husbandName || "",
      addressParty: partial.address,
      startsAt: partial.starts_at,
      endsAt: partial.ends_at,
    },
    createdAt: partial.created_at,
    updatedAt: partial.created_at,
    deletedAt: null,
  };
  return base;
}

const eventsMeta = [
  {
    id: "1",
    title: "Boda de Maria y Juan",
    address: "Salon de Eventos El Jardin, Calle Principal 123",
    type: "boda",
    capacity: 150,
    created_at: "2026-12-01T15:00:00.000Z",
    created_by: "Maria Gonzalez",
    status: "published",
    starts_at: "2026-12-17T18:00:00.000Z",
    ends_at: "2026-12-18T04:00:00.000Z",
    banner:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
    ],
    music: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    quote: "Una celebracion especial para unir nuestras vidas en matrimonio.",
    husbandName: "Juan Perez",
    wifeName: "Maria Gonzalez",
  },
  {
    id: "2",
    title: "Cumpleanos de Ana - 30 anos",
    address: "Restaurante La Terraza, Avenida Central 456",
    type: "cumpleanos",
    capacity: 80,
    created_at: "2026-11-25T12:00:00.000Z",
    created_by: "Roberto Martinez",
    status: "published",
    starts_at: "2026-12-20T20:00:00.000Z",
    ends_at: "2026-12-21T03:00:00.000Z",
    banner:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
    ],
    music: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    quote: "Celebracion de cumpleanos numero 30.",
  },
  {
    id: "3",
    title: "Aniversario de Bodas - 25 anos",
    address: "Hotel Grand Palace, Boulevard Norte 789",
    type: "aniversario",
    capacity: 200,
    created_at: "2026-11-20T09:00:00.000Z",
    created_by: "Carmen Garcia",
    status: "published",
    starts_at: "2026-12-25T19:00:00.000Z",
    ends_at: "2026-12-26T02:00:00.000Z",
    banner:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
    ],
    music: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    quote: "Celebrando 25 anos de amor y compromiso.",
    husbandName: "Luis Garcia",
    wifeName: "Carmen Garcia",
  },
];

const listEvents = eventsMeta.map((e) => eventData(e, { detail: false }));
writeJson("event-list/cases/success.json", { success: true, data: listEvents });
writeJson("event-list/cases/error-401.json", {
  success: false,
  data: null,
  message: "Unauthorized",
});

for (const e of eventsMeta) {
  writeJson(`event-get-by-id/cases/success-${e.id}.json`, {
    success: true,
    data: eventData(e, { detail: true }),
  });
}
writeJson("event-get-by-id/cases/error-404.json", {
  success: false,
  data: null,
  message: "Event not found",
});

writeJson("event-create/cases/success.json", {
  success: true,
  data: eventData(
    {
      ...eventsMeta[0],
      id: "4",
      title: "Evento creado (mock)",
      created_at: "2026-08-06T10:00:00.000Z",
    },
    { detail: false },
  ),
});
writeJson("event-create/cases/error-400.json", {
  success: false,
  data: null,
  message: "Invalid event payload",
});

writeJson("event-delete/cases/success.json", { success: true, data: true });
writeJson("event-delete/cases/error-404.json", {
  success: false,
  data: null,
  message: "Event not found",
});

writeJson("event-assets/cases/success.json", {
  success: true,
  data: {
    asset: asset(
      "asset-new-1",
      "1",
      "banner",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
      0,
    ),
  },
});
writeJson("event-assets/cases/error-400.json", {
  success: false,
  data: null,
  message: "Invalid asset upload",
});

writeJson("event-config/cases/success.json", { success: true, data: "ok" });
writeJson("event-config/cases/error-400.json", {
  success: false,
  data: null,
  message: "Invalid event config",
});

const names = [
  "Ana Martinez",
  "Carlos Rodriguez",
  "Laura Sanchez",
  "Pedro Lopez",
  "Sofia Hernandez",
  "Miguel Torres",
  "Elena Vega",
  "Diego Morales",
];
const statuses = [
  "ACCEPTED",
  "PENDING",
  "DECLINED",
  "ACCEPTED",
  "PENDING",
  "ACCEPTED",
  "PENDING",
  "DECLINED",
];

function invitationsFor(eventId) {
  return names.map((name, i) => {
    const id = `inv-${eventId}-${i + 1}`;
    const token = `token-${eventId}-${i + 1}`;
    const first = name.split(" ")[0].toLowerCase();
    return {
      id,
      name,
      email: `${first}@example.com`,
      invitation_url: `https://festanova.example/invite?token=${token}`,
      accept_url: `https://festanova.example/accept?token=${token}`,
      status: statuses[i],
      total_seats: 2,
      seats: 2,
    };
  });
}

for (const e of eventsMeta) {
  writeJson(`invitation-list/cases/success-${e.id}.json`, {
    success: true,
    data: invitationsFor(e.id),
  });
}
writeJson("invitation-list/cases/error-404.json", {
  success: false,
  data: null,
  message: "Event invitations not found",
});

writeJson("invitation-upload/cases/success.json", {
  success: true,
  data: {
    id: "upload-1",
    event_id: "1",
    file_name: "guests.csv",
    url: "https://example.com/uploads/guests.csv",
    created_at: "2026-08-06T10:00:00.000Z",
    updated_at: "2026-08-06T10:00:00.000Z",
  },
});
writeJson("invitation-upload/cases/error-400.json", {
  success: false,
  data: null,
  message: "Invalid CSV file",
});

writeJson("invitation-info/cases/success.json", {
  success: true,
  data: {
    available_seats: 1,
    total_seats: 2,
    used_seats: 1,
    invitation: {
      id: "inv-1-1",
      event_id: "1",
      email: "ana@example.com",
      name: "Ana Martinez",
      seats_reserved: 1,
      status: "ACCEPTED",
      token: "token-1-1",
      responded_at: "2026-08-01T12:00:00.000Z",
      created_at: "2026-07-01T12:00:00.000Z",
      updated_at: "2026-08-01T12:00:00.000Z",
      deleted_at: "",
      guests: [
        {
          id: "g-1",
          invitation_id: "inv-1-1",
          name: "Ana Martinez",
          created_at: "2026-07-01T12:00:00.000Z",
          updated_at: "2026-07-01T12:00:00.000Z",
          deleted_at: "",
        },
      ],
    },
  },
});
writeJson("invitation-info/cases/error-404.json", {
  success: false,
  data: null,
  message: "Invitation token not found",
});

writeJson("telemetry-traces/cases/success.json", { success: true, data: {} });
writeJson("telemetry-traces/cases/error-400.json", {
  success: false,
  data: null,
  message: "Invalid traces payload",
});

function fileResponse({
  label,
  statusCode,
  filePath,
  isDefault = false,
  rules = [],
}) {
  return {
    uuid: randomUUID(),
    body: "",
    latency: 0,
    statusCode,
    label,
    headers: [{ key: "Content-Type", value: "application/json" }],
    bodyType: "FILE",
    filePath,
    databucketID: "",
    sendFileAsBody: true,
    rules,
    rulesOperator: "OR",
    disableTemplating: false,
    fallbackTo404: false,
    default: isDefault,
    crudKey: "id",
    callbacks: [],
  };
}

function paramRule(name, value) {
  return {
    target: "params",
    modifier: name,
    value,
    invert: false,
    operator: "equals",
  };
}

function route({ documentation, method, endpoint, responses }) {
  return {
    uuid: randomUUID(),
    type: "http",
    documentation,
    method,
    endpoint,
    responses,
    responseMode: null,
    streamingMode: null,
    streamingInterval: 0,
  };
}

/** Carpeta Mockoon UI = misma carpeta en disco (`mock/<folder>/`). */
function entry(folder, routeDef) {
  return { folder, route: route(routeDef) };
}

const routeEntries = [
  entry("auth-login", {
    documentation: "Login",
    method: "post",
    endpoint: "v1/auth/login",
    responses: [
      fileResponse({
        label: "success",
        statusCode: 200,
        filePath: "./auth-login/cases/success.json",
        isDefault: true,
      }),
      fileResponse({
        label: "error-401",
        statusCode: 401,
        filePath: "./auth-login/cases/error-401.json",
        rules: [
          {
            target: "body",
            modifier: "password",
            value: "wrong",
            invert: false,
            operator: "equals",
          },
        ],
      }),
    ],
  }),
  entry("auth-register", {
    documentation: "Register",
    method: "post",
    endpoint: "v1/user/create",
    responses: [
      fileResponse({
        label: "success",
        statusCode: 201,
        filePath: "./auth-register/cases/success.json",
        isDefault: true,
      }),
      fileResponse({
        label: "error-400",
        statusCode: 400,
        filePath: "./auth-register/cases/error-400.json",
      }),
    ],
  }),
  entry("event-list", {
    documentation: "List events",
    method: "get",
    endpoint: "v1/event",
    responses: [
      fileResponse({
        label: "success",
        statusCode: 200,
        filePath: "./event-list/cases/success.json",
        isDefault: true,
      }),
      fileResponse({
        label: "error-401",
        statusCode: 401,
        filePath: "./event-list/cases/error-401.json",
      }),
    ],
  }),
  entry("event-get-by-id", {
    documentation: "Get event by id",
    method: "get",
    endpoint: "v1/event/:eventId",
    responses: [
      fileResponse({
        label: "success-1",
        statusCode: 200,
        filePath: "./event-get-by-id/cases/success-1.json",
        isDefault: true,
        rules: [paramRule("eventId", "1")],
      }),
      fileResponse({
        label: "success-2",
        statusCode: 200,
        filePath: "./event-get-by-id/cases/success-2.json",
        rules: [paramRule("eventId", "2")],
      }),
      fileResponse({
        label: "success-3",
        statusCode: 200,
        filePath: "./event-get-by-id/cases/success-3.json",
        rules: [paramRule("eventId", "3")],
      }),
      fileResponse({
        label: "error-404",
        statusCode: 404,
        filePath: "./event-get-by-id/cases/error-404.json",
      }),
    ],
  }),
  entry("event-create", {
    documentation: "Create event",
    method: "post",
    endpoint: "v1/event/create",
    responses: [
      fileResponse({
        label: "success",
        statusCode: 201,
        filePath: "./event-create/cases/success.json",
        isDefault: true,
      }),
      fileResponse({
        label: "error-400",
        statusCode: 400,
        filePath: "./event-create/cases/error-400.json",
      }),
    ],
  }),
  entry("event-delete", {
    documentation: "Delete event",
    method: "delete",
    endpoint: "v1/event/:eventId",
    responses: [
      fileResponse({
        label: "success",
        statusCode: 200,
        filePath: "./event-delete/cases/success.json",
        isDefault: true,
      }),
      fileResponse({
        label: "error-404",
        statusCode: 404,
        filePath: "./event-delete/cases/error-404.json",
      }),
    ],
  }),
  entry("event-assets", {
    documentation: "Upload event asset",
    method: "post",
    endpoint: "v1/event/:eventId/assets",
    responses: [
      fileResponse({
        label: "success",
        statusCode: 201,
        filePath: "./event-assets/cases/success.json",
        isDefault: true,
      }),
      fileResponse({
        label: "error-400",
        statusCode: 400,
        filePath: "./event-assets/cases/error-400.json",
      }),
    ],
  }),
  entry("event-config", {
    documentation: "Configure event",
    method: "post",
    endpoint: "v1/event-config/:eventType/:eventId",
    responses: [
      fileResponse({
        label: "success",
        statusCode: 200,
        filePath: "./event-config/cases/success.json",
        isDefault: true,
      }),
      fileResponse({
        label: "error-400",
        statusCode: 400,
        filePath: "./event-config/cases/error-400.json",
      }),
    ],
  }),
  entry("invitation-list", {
    documentation: "List invitations by event",
    method: "get",
    endpoint: "v1/invitation/:eventId",
    responses: [
      fileResponse({
        label: "success-1",
        statusCode: 200,
        filePath: "./invitation-list/cases/success-1.json",
        isDefault: true,
        rules: [paramRule("eventId", "1")],
      }),
      fileResponse({
        label: "success-2",
        statusCode: 200,
        filePath: "./invitation-list/cases/success-2.json",
        rules: [paramRule("eventId", "2")],
      }),
      fileResponse({
        label: "success-3",
        statusCode: 200,
        filePath: "./invitation-list/cases/success-3.json",
        rules: [paramRule("eventId", "3")],
      }),
      fileResponse({
        label: "error-404",
        statusCode: 404,
        filePath: "./invitation-list/cases/error-404.json",
      }),
    ],
  }),
  entry("invitation-upload", {
    documentation: "Upload invitations CSV",
    method: "post",
    endpoint: "v1/invitation/:eventId/upload",
    responses: [
      fileResponse({
        label: "success",
        statusCode: 201,
        filePath: "./invitation-upload/cases/success.json",
        isDefault: true,
      }),
      fileResponse({
        label: "error-400",
        statusCode: 400,
        filePath: "./invitation-upload/cases/error-400.json",
      }),
    ],
  }),
  entry("invitation-info", {
    documentation: "Invitation info by token",
    method: "get",
    endpoint: "v1/invitation/info/:token",
    responses: [
      fileResponse({
        label: "success",
        statusCode: 200,
        filePath: "./invitation-info/cases/success.json",
        isDefault: true,
      }),
      fileResponse({
        label: "error-404",
        statusCode: 404,
        filePath: "./invitation-info/cases/error-404.json",
      }),
    ],
  }),
  entry("telemetry-traces", {
    documentation: "Telemetry traces",
    method: "post",
    endpoint: "v1/traces",
    responses: [
      fileResponse({
        label: "success",
        statusCode: 200,
        filePath: "./telemetry-traces/cases/success.json",
        isDefault: true,
      }),
      fileResponse({
        label: "error-400",
        statusCode: 400,
        filePath: "./telemetry-traces/cases/error-400.json",
      }),
    ],
  }),
];

const routes = routeEntries.map((e) => e.route);

const folders = routeEntries.map((e) => ({
  uuid: randomUUID(),
  name: e.folder,
  children: [{ type: "route", uuid: e.route.uuid }],
}));

const environment = {
  uuid: randomUUID(),
  lastMigration: 33,
  name: "Festanova Admin API Mock",
  endpointPrefix: "",
  latency: 0,
  port: 3000,
  hostname: "localhost",
  folders,
  routes,
  rootChildren: folders.map((f) => ({ type: "folder", uuid: f.uuid })),
  proxyMode: false,
  proxyHost: "",
  proxyRemovePrefix: false,
  tlsOptions: {
    enabled: false,
    type: "CERT",
    pfxPath: "",
    certPath: "",
    keyPath: "",
    caPath: "",
    passphrase: "",
  },
  cors: true,
  headers: [
    { key: "Content-Type", value: "application/json" },
    { key: "Access-Control-Allow-Origin", value: "*" },
    {
      key: "Access-Control-Allow-Methods",
      value: "GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS",
    },
    {
      key: "Access-Control-Allow-Headers",
      value:
        "Content-Type, Origin, Accept, Authorization, Content-Length, X-Requested-With",
    },
  ],
  proxyReqHeaders: [],
  proxyResHeaders: [],
  data: [],
  callbacks: [],
};

writeJson("environment.json", environment);
console.log(
  `Wrote ${routes.length} routes in ${folders.length} folders under mock/`,
);
