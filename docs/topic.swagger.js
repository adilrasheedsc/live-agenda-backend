const topicPaths = {
  // ==========================================
  // CREATE TOPIC
  // POST /api/topics
  // ==========================================

  "/topics": {
    post: {
      tags: ["Admin - Topics"],
      summary: "Create a new topic",
      description:
        "Creates a topic with session, timing, topic type, faculty, moderators, panelists, and expert panelists.",

      security: [{ bearerAuth: [] }],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "sessionId",
                "topicName",
                "startTime",
                "endTime",
              ],
              properties: {
                sessionId: {
                  type: "string",
                  example: "672b12345678901234567893",
                },

                topicName: {
                  type: "string",
                  minLength: 2,
                  maxLength: 100,
                  example: "Recent Advances in Pediatrics",
                },

                startTime: {
                  type: "string",
                  example: "10:30 AM",
                },

                endTime: {
                  type: "string",
                  example: "11:00 AM",
                },

                topicType: {
                  type: "string",
                  enum: ["Talk", "Debate", "Panel Discussion"],
                  default: "Talk",
                  example: "Talk",
                },

                facultyId: {
                  type: "array",
                  items: {
                    type: "string",
                    example: "672b12345678901234567892",
                  },
                },

                moderatorId: {
                  type: "array",
                  items: {
                    type: "string",
                    example: "672b12345678901234567892",
                  },
                },

                panelistId: {
                  type: "array",
                  items: {
                    type: "string",
                    example: "672b12345678901234567892",
                  },
                },

                expertPanelistId: {
                  type: "array",
                  items: {
                    type: "string",
                    example: "672b12345678901234567892",
                  },
                },
              },
            },

            example: {
              sessionId: "672b12345678901234567893",
              topicName: "Recent Advances in Pediatrics",
              startTime: "10:30 AM",
              endTime: "11:00 AM",
              topicType: "Talk",
              facultyId: [
                "672b12345678901234567892",
              ],
              moderatorId: [
                "672b12345678901234567892",
              ],
              panelistId: [
                "672b12345678901234567892",
              ],
              expertPanelistId: [
                "672b12345678901234567892",
              ],
            },
          },
        },
      },

      responses: {
        201: {
          description: "Topic created successfully.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "Topic created successfully.",
                  },
                  data: {
                    type: "object",
                    properties: {
                      topic: {
                        $ref: "#/components/schemas/Topic",
                      },
                    },
                  },
                },
              },
            },
          },
        },

        400: {
          description: "Validation error.",
        },

        401: {
          description: "Unauthorized.",
        },

        500: {
          description: "Internal server error.",
        },
      },
    },

    // ==========================================
    // GET ALL TOPICS WITH PAGINATION
    // ==========================================

    get: {
      tags: ["Admin - Topics"],
      summary: "Get all topics with pagination",
      description:
        "Returns topics with pagination, searching, sorting, populated Faculty details, and populated Session details including its chairpersons.",

      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "page",
          in: "query",
          schema: {
            type: "integer",
            default: 1,
            minimum: 1,
          },
          description: "Page number.",
        },
        {
          name: "limit",
          in: "query",
          schema: {
            type: "integer",
            default: 20,
            minimum: 1,
            maximum: 100,
          },
          description: "Number of topics per page. Maximum 100.",
        },
        {
          name: "search",
          in: "query",
          schema: {
            type: "string",
          },
          description:
            "Search topics by topic name, start time, end time, or topic type.",
          example: "Pediatrics",
        },
        {
          name: "sortBy",
          in: "query",
          schema: {
            type: "string",
            enum: [
              "topicName",
              "startTime",
              "endTime",
              "topicType",
              "createdAt",
              "updatedAt",
            ],
            default: "createdAt",
          },
          description: "Field used to sort topics.",
        },
        {
          name: "order",
          in: "query",
          schema: {
            type: "string",
            enum: ["asc", "desc"],
            default: "desc",
          },
          description: "Sorting order.",
        },
      ],

      responses: {
        200: {
          description: "Topics fetched successfully.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "Topics fetched successfully.",
                  },
                  data: {
                    type: "object",
                    properties: {
                      topics: {
                        type: "array",
                        items: {
                          $ref: "#/components/schemas/Topic",
                        },
                      },
                    },
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      page: {
                        type: "integer",
                        example: 1,
                      },
                      limit: {
                        type: "integer",
                        example: 20,
                      },
                      total: {
                        type: "integer",
                        example: 50,
                      },
                      totalPages: {
                        type: "integer",
                        example: 3,
                      },
                      from: {
                        type: "integer",
                        example: 1,
                      },
                      to: {
                        type: "integer",
                        example: 20,
                      },
                      hasPreviousPage: {
                        type: "boolean",
                        example: false,
                      },
                      hasNextPage: {
                        type: "boolean",
                        example: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },

        401: {
          description: "Unauthorized.",
        },

        500: {
          description: "Internal server error.",
        },
      },
    },
  },

  // ==========================================
  // GET ALL TOPICS WITHOUT PAGINATION
  // GET /api/topics/all
  // ==========================================

  "/topics/all": {
    get: {
      tags: ["Admin - Topics"],
      summary: "Get all topics without pagination",
      description:
        "Returns all topics without pagination, with optional searching, sorting, populated Faculty details, and populated Session details including its chairpersons.",

      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "search",
          in: "query",
          schema: {
            type: "string",
          },
          description:
            "Search topics by topic name, start time, end time, or topic type.",
          example: "Pediatrics",
        },
        {
          name: "sortBy",
          in: "query",
          schema: {
            type: "string",
            enum: [
              "topicName",
              "startTime",
              "endTime",
              "topicType",
              "createdAt",
              "updatedAt",
            ],
            default: "createdAt",
          },
          description: "Field used to sort topics.",
        },
        {
          name: "order",
          in: "query",
          schema: {
            type: "string",
            enum: ["asc", "desc"],
            default: "desc",
          },
          description: "Sorting order.",
        },
      ],

      responses: {
        200: {
          description: "Topics fetched successfully.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "Topics fetched successfully.",
                  },
                  data: {
                    type: "object",
                    properties: {
                      topics: {
                        type: "array",
                        items: {
                          $ref: "#/components/schemas/Topic",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        401: {
          description: "Unauthorized.",
        },

        500: {
          description: "Internal server error.",
        },
      },
    },
  },

  // ==========================================
  // GET, UPDATE AND DELETE TOPIC BY ID
  // ==========================================

  "/topics/{id}": {
    // ==========================================
    // GET TOPIC BY ID
    // ==========================================

    get: {
      tags: ["Admin - Topics"],
      summary: "Get topic by ID",
      description:
        "Fetches a topic using its MongoDB ID with populated Faculty details and populated Session details including its chairpersons.",

      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "MongoDB Topic ID.",
          example: "672b12345678901234567894",
        },
      ],

      responses: {
        200: {
          description: "Topic fetched successfully.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "Topic fetched successfully.",
                  },
                  data: {
                    type: "object",
                    properties: {
                      topic: {
                        $ref: "#/components/schemas/Topic",
                      },
                    },
                  },
                },
              },
            },
          },
        },

        400: {
          description: "Invalid topic ID.",
        },

        401: {
          description: "Unauthorized.",
        },

        404: {
          description: "Topic not found.",
        },

        500: {
          description: "Internal server error.",
        },
      },
    },

    // ==========================================
    // UPDATE TOPIC
    // ==========================================

    put: {
      tags: ["Admin - Topics"],
      summary: "Update topic",
      description:
        "Updates topic details, session, topic type, faculty, moderators, panelists, or expert panelists.",

      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "MongoDB Topic ID.",
          example: "672b12345678901234567894",
        },
      ],

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              minProperties: 1,
              properties: {
                sessionId: {
                  type: "string",
                  example: "672b12345678901234567893",
                },
                topicName: {
                  type: "string",
                  minLength: 2,
                  maxLength: 100,
                  example: "Updated Pediatrics Topic",
                },
                startTime: {
                  type: "string",
                  example: "11:00 AM",
                },
                endTime: {
                  type: "string",
                  example: "11:30 AM",
                },
                topicType: {
                  type: "string",
                  enum: ["Talk", "Debate", "Panel Discussion"],
                  example: "Panel Discussion",
                },
                facultyId: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                moderatorId: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                panelistId: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                expertPanelistId: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
            },

            examples: {
              updateName: {
                summary: "Update topic name",
                value: {
                  topicName: "Updated Pediatrics Topic",
                },
              },

              updateTime: {
                summary: "Update topic time",
                value: {
                  startTime: "11:00 AM",
                  endTime: "11:30 AM",
                },
              },

              updateTopicType: {
                summary: "Update topic type",
                value: {
                  topicType: "Panel Discussion",
                },
              },

              updateFaculty: {
                summary: "Update faculty",
                value: {
                  facultyId: [
                    "672b12345678901234567892",
                  ],
                },
              },

              updateAll: {
                summary: "Update all topic details",
                value: {
                  sessionId: "672b12345678901234567893",
                  topicName: "Updated Pediatrics Topic",
                  startTime: "11:00 AM",
                  endTime: "11:30 AM",
                  topicType: "Panel Discussion",
                  facultyId: [
                    "672b12345678901234567892",
                  ],
                  moderatorId: [
                    "672b12345678901234567892",
                  ],
                  panelistId: [
                    "672b12345678901234567892",
                  ],
                  expertPanelistId: [
                    "672b12345678901234567892",
                  ],
                },
              },
            },
          },
        },
      },

      responses: {
        200: {
          description: "Topic updated successfully.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "Topic updated successfully.",
                  },
                  data: {
                    type: "object",
                    properties: {
                      topic: {
                        $ref: "#/components/schemas/Topic",
                      },
                    },
                  },
                },
              },
            },
          },
        },

        400: {
          description: "Validation error or invalid topic ID.",
        },

        401: {
          description: "Unauthorized.",
        },

        404: {
          description: "Topic not found.",
        },

        500: {
          description: "Internal server error.",
        },
      },
    },

    // ==========================================
    // DELETE TOPIC
    // ==========================================

    delete: {
      tags: ["Admin - Topics"],
      summary: "Delete topic",
      description:
        "Permanently deletes a topic using its MongoDB ID.",

      security: [{ bearerAuth: [] }],

      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "MongoDB Topic ID.",
          example: "672b12345678901234567894",
        },
      ],

      responses: {
        200: {
          description: "Topic deleted successfully.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: true,
                  },
                  message: {
                    type: "string",
                    example: "Topic deleted successfully.",
                  },
                  data: {
                    type: "object",
                    properties: {
                      topic: {
                        $ref: "#/components/schemas/Topic",
                      },
                    },
                  },
                },
              },
            },
          },
        },

        400: {
          description: "Invalid topic ID.",
        },

        401: {
          description: "Unauthorized.",
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

export default topicPaths;