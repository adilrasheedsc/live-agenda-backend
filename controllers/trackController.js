
import mongoose from "mongoose";

import Track from "../models/Track.js";

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

const isValidId = (id) => mongoose.isValidObjectId(id);

// Allowed Fields
const ALLOWED_FILTER_FIELDS = ["status"];

const ALLOWED_SEARCH_FIELDS = ["trackName"];

const ALLOWED_SORT_FIELDS = [
  "trackName",
  "status",
  "createdAt",
  "updatedAt",
];

// ==========================================
// CREATE TRACK
// POST /api/tracks
// ==========================================

export const createTrack = asyncHandler(async (req, res) => {
  const { trackName, status } = req.body;

  // Validate Track Name
  if (
    typeof trackName !== "string" ||
    !trackName.trim()
  ) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Track name is required.",
    });
  }

  if (
    trackName.trim().length < 2 ||
    trackName.trim().length > 100
  ) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Track name must be between 2 and 100 characters.",
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

  // Create Track
  const track = await Track.create({
    trackName: trackName.trim(),
    ...(status !== undefined && { status }),
  });

  return successResponse(res, {
    statusCode: 201,
    message: "Track created successfully.",
    data: { track },
  });
});

// ==========================================
// GET ALL TRACKS WITH PAGINATION
// GET /api/tracks
// ==========================================

export const getAllTracks = asyncHandler(async (req, res) => {
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

  // Fetch Tracks and Total Count
  const [tracks, total] = await Promise.all([
    Track.find(filterQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .lean(),

    Track.countDocuments(filterQuery),
  ]);

  // Pagination Metadata Utility
  const pagination = buildPaginationMeta(
    total,
    page,
    limit
  );

  const data = { tracks };

  return successResponse(res, {
    statusCode: 200,
    message: "Tracks fetched successfully.",
    data,
    pagination,
  });
});

// ==========================================
// GET ALL ACTIVE TRACKS WITH PAGINATION
// GET /api/tracks/active
// ==========================================

export const getActiveTracks = asyncHandler(async (req, res) => {
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

  // Only Active Tracks
  const filterQuery = {
    status: "Active",
    ...searchQuery,
  };

  // Fetch Active Tracks and Total Count
  const [tracks, total] = await Promise.all([
    Track.find(filterQuery)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .lean(),

    Track.countDocuments(filterQuery),
  ]);

  // Pagination Metadata Utility
  const pagination = buildPaginationMeta(
    total,
    page,
    limit
  );

  const data = { tracks };

  return successResponse(res, {
    statusCode: 200,
    message: "Active tracks fetched successfully.",
    data,
    pagination,
  });
});

// ==========================================
// GET ALL ACTIVE TRACKS WITHOUT PAGINATION
// GET /api/tracks/active/all
// ==========================================

export const getAllActiveTracksWithoutPagination =
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
      "trackName"
    );

    // Only Active Tracks
    const filterQuery = {
      status: "Active",
      ...searchQuery,
    };

    // Fetch All Active Tracks
    const tracks = await Track.find(filterQuery)
      .sort(sortQuery)
      .lean();

    const data = { tracks };

    return successResponse(res, {
      statusCode: 200,
      message: "Active tracks fetched successfully.",
      data,
    });
  });

// ==========================================
// GET TRACK BY ID
// GET /api/tracks/:id
// ==========================================

export const getTrackById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!isValidId(id)) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Invalid track ID.",
    });
  }

  // Find Track
  const track = await Track.findById(id).lean();

  if (!track) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Track not found.",
    });
  }

  const data = { track };

  return successResponse(res, {
    statusCode: 200,
    message: "Track fetched successfully.",
    data,
  });
});

// ==========================================
// UPDATE TRACK
// PUT /api/tracks/:id
// ==========================================

export const updateTrack = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { trackName, status } = req.body;

  // Validate ID
  if (!isValidId(id)) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Invalid track ID.",
    });
  }

  const updateData = {};

  // Validate Track Name
  if (trackName !== undefined) {
    if (
      typeof trackName !== "string" ||
      !trackName.trim() ||
      trackName.trim().length < 2 ||
      trackName.trim().length > 100
    ) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Track name must be between 2 and 100 characters.",
      });
    }

    updateData.trackName = trackName.trim();
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

  // Update Track
  const track = await Track.findByIdAndUpdate(
    id,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!track) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Track not found.",
    });
  }

  return successResponse(res, {
    statusCode: 200,
    message: "Track updated successfully.",
    data: { track },
  });
});

// ==========================================
// DELETE TRACK
// DELETE /api/tracks/:id
// ==========================================

export const deleteTrack = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!isValidId(id)) {
    return errorResponse(res, {
      statusCode: 400,
      message: "Invalid track ID.",
    });
  }

  // Delete Track
  const track = await Track.findByIdAndDelete(id);

  if (!track) {
    return errorResponse(res, {
      statusCode: 404,
      message: "Track not found.",
    });
  }

  return successResponse(res, {
    statusCode: 200,
    message: "Track deleted successfully.",
    data: { track },
  });
});
