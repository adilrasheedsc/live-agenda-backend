
import mongoose from "mongoose";

import Hall from "../models/Hall.js";

import asyncHandler from "../utils/asyncHandler.js";

import {
  successResponse,
  errorResponse,
} from "../utils/response.js";

import buildFiltersQuery from "../utils/filters.js";

import {
  getPagination,
  buildPaginationMeta,
} from "../utils/pagination.js";

import buildSearchQuery from "../utils/search.js";
import buildSortQuery from "../utils/sort.js";

// ==========================================
// COMMON HELPERS
// ==========================================

// Validate MongoDB ObjectId
const isValidId = (id) => mongoose.isValidObjectId(id);

// Allowed Fields
const ALLOWED_FILTER_FIELDS = ["status"];

const ALLOWED_SEARCH_FIELDS = ["hallName"];

const ALLOWED_SORT_FIELDS = [
  "hallName",
  "status",
  "createdAt",
  "updatedAt",
];

// ==========================================
// CREATE HALL
// POST /api/halls
// ==========================================

export const createHall = asyncHandler(async (req, res) => {
  const { hallName, status } = req.body;

  // Validate Hall Name
  if (
    typeof hallName !== "string" ||
    !hallName.trim()
  ) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Hall name is required.",
    });
  }

  if (
    hallName.trim().length < 2 ||
    hallName.trim().length > 100
  ) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Hall name must be between 2 and 100 characters.",
    });
  }

  // Validate Status
  if (
    status !== undefined &&
    !["Active", "Inactive"].includes(status)
  ) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Status must be either Active or Inactive.",
    });
  }

  // Create Hall
  const hall = await Hall.create({
    hallName: hallName.trim(),
    ...(status !== undefined && { status }),
  });

  return successResponse(res, {
    statusCode: 201,
    message: "Hall created successfully.",
    data: { hall },
  });
});

// ==========================================
// GET ALL HALLS WITH PAGINATION
// GET /api/halls
// ==========================================

export const getAllHalls = asyncHandler(async (req, res) => {
  // Pagination Utility
  const { page, limit, skip } = getPagination(req);

  // Filter Utility
  const filters = buildFiltersQuery(
    req,
    ALLOWED_FILTER_FIELDS
  );

  // Search Utility
  const searchQuery = buildSearchQuery(
    req,
    ALLOWED_SEARCH_FIELDS
  );

  // Sort Utility
  const sortQuery = buildSortQuery(
    req,
    ALLOWED_SORT_FIELDS,
    "createdAt"
  );

  // Combine Filters and Search
  const filterQuery = {
    ...filters,
    ...searchQuery,
  };

  // Fetch Halls and Total Count
  const [halls, total] = await Promise.all([
    Hall.find(filterQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .lean(),

    Hall.countDocuments(filterQuery),
  ]);

  // Pagination Metadata Utility
  const pagination = buildPaginationMeta(
    total,
    page,
    limit
  );

  const data = { halls };

  return successResponse(res, {
    statusCode: 200,
    message: "Halls fetched successfully.",
    data,
    pagination,
  });
});

// ==========================================
// GET ALL ACTIVE HALLS WITH PAGINATION
// GET /api/halls/active
// ==========================================

export const getActiveHalls = asyncHandler(async (req, res) => {
  // Pagination Utility
  const { page, limit, skip } = getPagination(req);

  // Search Utility
  const searchQuery = buildSearchQuery(
    req,
    ALLOWED_SEARCH_FIELDS
  );

  // Sort Utility
  const sortQuery = buildSortQuery(
    req,
    ALLOWED_SORT_FIELDS,
    "createdAt"
  );

  // Only Active Halls
  const filterQuery = {
    status: "Active",
    ...searchQuery,
  };

  // Fetch Active Halls and Total Count
  const [halls, total] = await Promise.all([
    Hall.find(filterQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .lean(),

    Hall.countDocuments(filterQuery),
  ]);

  // Pagination Metadata Utility
  const pagination = buildPaginationMeta(
    total,
    page,
    limit
  );

  const data = { halls };

  return successResponse(res, {
    statusCode: 200,
    message: "Active halls fetched successfully.",
    data,
    pagination,
  });
});

// ==========================================
// GET ALL ACTIVE HALLS WITHOUT PAGINATION
// GET /api/halls/active/all
// ==========================================

export const getAllActiveHallsWithoutPagination =
  asyncHandler(async (req, res) => {
    // Search Utility
    const searchQuery = buildSearchQuery(
      req,
      ALLOWED_SEARCH_FIELDS
    );

    // Sort Utility
    const sortQuery = buildSortQuery(
      req,
      ALLOWED_SORT_FIELDS,
      "hallName"
    );

    // Only Active Halls
    const filterQuery = {
      status: "Active",
      ...searchQuery,
    };

    // Fetch All Active Halls
    const halls = await Hall.find(filterQuery)
      .sort(sortQuery)
      .lean();

    const data = { halls };

    return successResponse(res, {
      statusCode: 200,
      message: "Active halls fetched successfully.",
      data,
    });
  });

// ==========================================
// GET HALL BY ID
// GET /api/halls/:id
// ==========================================

export const getHallById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!isValidId(id)) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Invalid hall ID.",
    });
  }

  // Find Hall
  const hall = await Hall.findById(id).lean();

  if (!hall) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Hall not found.",
    });
  }

  const data = { hall };

  return successResponse(res, {
    statusCode: 200,
    message: "Hall fetched successfully.",
    data,
  });
});

// ==========================================
// UPDATE HALL
// PUT /api/halls/:id
// ==========================================

export const updateHall = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { hallName, status } = req.body;

  // Validate ID
  if (!isValidId(id)) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Invalid hall ID.",
    });
  }

  const updateData = {};

  // Validate Hall Name
  if (hallName !== undefined) {
    if (
      typeof hallName !== "string" ||
      !hallName.trim() ||
      hallName.trim().length < 2 ||
      hallName.trim().length > 100
    ) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Hall name must be between 2 and 100 characters.",
      });
    }

    updateData.hallName = hallName.trim();
  }

  // Validate Status
  if (status !== undefined) {
    if (!["Active", "Inactive"].includes(status)) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Status must be either Active or Inactive.",
      });
    }

    updateData.status = status;
  }

  // Check Empty Update
  if (Object.keys(updateData).length === 0) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Please provide at least one field to update.",
    });
  }

  // Update Hall
  const hall = await Hall.findByIdAndUpdate(
    id,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!hall) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Hall not found.",
    });
  }

  return successResponse(res, {
    statusCode: 200,
    message: "Hall updated successfully.",
    data: { hall },
  });
});

// ==========================================
// DELETE HALL
// DELETE /api/halls/:id
// ==========================================

export const deleteHall = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!isValidId(id)) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Invalid hall ID.",
    });
  }

  // Delete Hall
  const hall = await Hall.findByIdAndDelete(id);

  if (!hall) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Hall not found.",
    });
  }

  return successResponse(res, {
    statusCode: 200,
    message: "Hall deleted successfully.",
    data: { hall },
  });
});
