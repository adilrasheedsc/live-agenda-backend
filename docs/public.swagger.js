const publicPaths = {
  // ==========================================
  // PUBLIC HALLS
  // ==========================================

  "/public/halls": {
    get: {
      tags: ["Public"],
      summary: "Get all active halls",
      description:
        "Returns all active halls. This endpoint is public and does not require authentication.",
      parameters: [
        {
          in: "query",
          name: "search",
          schema: { type: "string" },
          description: "Search halls by hall name.",
        },
      ],
      responses: {
        200: {
          description: "Active halls retrieved successfully.",
        },
        500: {
          description: "Internal server error.",
        },
      },
    },
  },

  // ==========================================
  // PUBLIC TRACKS
  // ==========================================

  "/public/tracks": {
    get: {
      tags: ["Public"],
      summary: "Get all active tracks",
      description:
        "Returns all active tracks. This endpoint is public and does not require authentication.",
      parameters: [
        {
          in: "query",
          name: "search",
          schema: { type: "string" },
          description: "Search tracks by track name.",
        },
      ],
      responses: {
        200: {
          description: "Active tracks retrieved successfully.",
        },
        500: {
          description: "Internal server error.",
        },
      },
    },
  },

  // ==========================================
  // PUBLIC FACULTIES
  // ==========================================

  "/public/faculties": {
    get: {
      tags: ["Public"],
      summary: "Get all public faculties",
      description:
        "Returns faculty IDs and names for public schedule display and faculty filtering. Email addresses and mobile numbers are not exposed.",
      parameters: [
        {
          in: "query",
          name: "search",
          schema: { type: "string" },
          description: "Search faculties by full name.",
        },
      ],
      responses: {
        200: {
          description: "Public faculties retrieved successfully.",
        },
        500: {
          description: "Internal server error.",
        },
      },
    },
  },

  // ==========================================
  // PUBLIC SCHEDULE DATES
  // ==========================================

  "/public/dates": {
    get: {
      tags: ["Public"],
      summary: "Get available schedule dates",
      description:
        "Returns unique dates on which sessions are scheduled, formatted as YYYY-MM-DD.",
      responses: {
        200: {
          description: "Schedule dates retrieved successfully.",
        },
        500: {
          description: "Internal server error.",
        },
      },
    },
  },

  // ==========================================
  // PUBLIC COMPLETE SCHEDULE
  // ==========================================

  "/public/schedule": {
    get: {
      tags: ["Public"],
      summary: "Get complete public schedule",
      description:
        "Returns the schedule grouped by date, hall, track, session, and topic. Supports multiple optional filters.",
      parameters: [
        {
          in: "query",
          name: "date",
          schema: {
            type: "string",
            format: "date",
          },
          description: "Filter by session date (YYYY-MM-DD).",
        },
        {
          in: "query",
          name: "hallId",
          schema: { type: "string" },
          description: "Filter by Hall ID.",
        },
        {
          in: "query",
          name: "trackId",
          schema: { type: "string" },
          description: "Filter by Track ID.",
        },
        {
          in: "query",
          name: "sessionId",
          schema: { type: "string" },
          description: "Filter by Session ID.",
        },
        {
          in: "query",
          name: "topicType",
          schema: {
            type: "string",
            enum: ["Talk", "Debate", "Panel Discussion"],
          },
          description: "Filter by topic type.",
        },
        {
          in: "query",
          name: "facultyId",
          schema: { type: "string" },
          description: "Filter by Faculty ID.",
        },
        {
          in: "query",
          name: "search",
          schema: { type: "string" },
          description: "Search session and topic names.",
        },
      ],
      responses: {
        200: {
          description: "Complete grouped schedule retrieved successfully.",
        },
        400: {
          description: "Invalid filter parameter.",
        },
        500: {
          description: "Internal server error.",
        },
      },
    },
  },

  // ==========================================
  // PUBLIC SESSIONS
  // ==========================================

  "/public/sessions": {
    get: {
      tags: ["Public"],
      summary: "Get all public sessions",
      description:
        "Returns paginated sessions with Hall, Track, Chairperson, and related schedule information.",
      parameters: [
        {
          in: "query",
          name: "page",
          schema: { type: "integer", default: 1 },
          description: "Page number.",
        },
        {
          in: "query",
          name: "limit",
          schema: { type: "integer", default: 10 },
          description: "Number of records per page.",
        },
        {
          in: "query",
          name: "search",
          schema: { type: "string" },
          description: "Search by session name or time.",
        },
        {
          in: "query",
          name: "hallId",
          schema: { type: "string" },
          description: "Filter by Hall ID.",
        },
        {
          in: "query",
          name: "trackId",
          schema: { type: "string" },
          description: "Filter by Track ID.",
        },
        {
          in: "query",
          name: "date",
          schema: { type: "string", format: "date" },
          description: "Filter by session date (YYYY-MM-DD).",
        },
        {
          in: "query",
          name: "topicType",
          schema: {
            type: "string",
            enum: ["Talk", "Debate", "Panel Discussion"],
          },
          description: "Filter sessions by their topic type.",
        },
        {
          in: "query",
          name: "facultyId",
          schema: { type: "string" },
          description: "Filter sessions by Faculty ID.",
        },
        {
          in: "query",
          name: "sortBy",
          schema: {
            type: "string",
            enum: [
              "sessionName",
              "sessionDate",
              "startTime",
              "endTime",
              "createdAt",
              "updatedAt",
            ],
          },
          description: "Field used to sort sessions.",
        },
        {
          in: "query",
          name: "order",
          schema: {
            type: "string",
            enum: ["asc", "desc"],
            default: "desc",
          },
          description: "Sort direction.",
        },
      ],
      responses: {
        200: {
          description: "Sessions retrieved successfully.",
        },
        400: {
          description: "Invalid filter parameter.",
        },
        500: {
          description: "Internal server error.",
        },
      },
    },
  },

  // ==========================================
  // PUBLIC SESSION BY ID
  // ==========================================

  "/public/sessions/{id}": {
    get: {
      tags: ["Public"],
      summary: "Get public session by ID",
      description:
        "Returns one session with its Hall, Track, Chairperson names, and related topics.",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "MongoDB Session ID.",
        },
      ],
      responses: {
        200: {
          description: "Session retrieved successfully.",
        },
        400: {
          description: "Invalid session ID.",
        },
        404: {
          description: "Session not found.",
        },
        500: {
          description: "Internal server error.",
        },
      },
    },
  },

  // ==========================================
  // PUBLIC TOPICS
  // ==========================================

  "/public/topics": {
    get: {
      tags: ["Public"],
      summary: "Get all public topics",
      description:
        "Returns paginated topics with session, Hall, Track, and public Faculty information.",
      parameters: [
        {
          in: "query",
          name: "page",
          schema: { type: "integer", default: 1 },
          description: "Page number.",
        },
        {
          in: "query",
          name: "limit",
          schema: { type: "integer", default: 10 },
          description: "Number of records per page.",
        },
        {
          in: "query",
          name: "search",
          schema: { type: "string" },
          description: "Search by topic name.",
        },
        {
          in: "query",
          name: "topicType",
          schema: {
            type: "string",
            enum: ["Talk", "Debate", "Panel Discussion"],
          },
          description: "Filter by topic type.",
        },
        {
          in: "query",
          name: "sessionId",
          schema: { type: "string" },
          description: "Filter by Session ID.",
        },
        {
          in: "query",
          name: "hallId",
          schema: { type: "string" },
          description: "Filter by Hall ID.",
        },
        {
          in: "query",
          name: "trackId",
          schema: { type: "string" },
          description: "Filter by Track ID.",
        },
        {
          in: "query",
          name: "date",
          schema: { type: "string", format: "date" },
          description: "Filter by session date (YYYY-MM-DD).",
        },
        {
          in: "query",
          name: "facultyId",
          schema: { type: "string" },
          description: "Filter by Faculty ID.",
        },
      ],
      responses: {
        200: {
          description: "Topics retrieved successfully.",
        },
        400: {
          description: "Invalid filter parameter.",
        },
        500: {
          description: "Internal server error.",
        },
      },
    },
  },

  // ==========================================
  // PUBLIC TOPIC BY ID
  // ==========================================

  "/public/topics/{id}": {
    get: {
      tags: ["Public"],
      summary: "Get public topic by ID",
      description:
        "Returns one topic with its Session, Hall, Track, and Faculty names.",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "MongoDB Topic ID.",
        },
      ],
      responses: {
        200: {
          description: "Topic retrieved successfully.",
        },
        400: {
          description: "Invalid topic ID.",
        },
        404: {
          description: "Topic not found.",
        },
        500: {
          description: "Internal server error.",
        },
      },
    },
  },
};

export default publicPaths;
