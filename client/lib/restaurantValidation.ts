import { ApiError } from '@/lib/errors';

export interface RestaurantInput {
  name: string;
  cuisine: string | null;
  address: string | null;
  rating: number | null;
}

export function validateRestaurantBody(body: unknown): RestaurantInput {
  if (
    typeof body !== 'object' ||
    body === null ||
    Array.isArray(body)
  ) {
    throw new ApiError(400, 'Request body must be a JSON object');
  }

  const input = body as Record<string, unknown>;

  if (typeof input.name !== 'string' || input.name.trim() === '') {
    throw new ApiError(400, 'Name is required');
  }

  if (
    input.cuisine !== undefined &&
    input.cuisine !== null &&
    typeof input.cuisine !== 'string'
  ) {
    throw new ApiError(400, 'Cuisine must be a string or null');
  }

  if (
    input.address !== undefined &&
    input.address !== null &&
    typeof input.address !== 'string'
  ) {
    throw new ApiError(400, 'Address must be a string or null');
  }

  if (
    input.rating !== undefined &&
    input.rating !== null &&
    (
      typeof input.rating !== 'number' ||
      !Number.isFinite(input.rating) ||
      input.rating < 0 ||
      input.rating > 5
    )
  ) {
    throw new ApiError(400, 'Rating must be a number from 0 to 5 or null');
  }

  return {
    name: input.name.trim(),
    cuisine: (input.cuisine as string | null | undefined) ?? null,
    address: (input.address as string | null | undefined) ?? null,
    rating: (input.rating as number | null | undefined) ?? null,
  };
}

export function parseRestaurantId(value: string): number | null {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const id = Number(value);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return null;
  }

  return id;
}