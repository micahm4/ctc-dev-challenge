import { NextResponse } from 'next/server';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

type DatabaseError = {
  code?: string;
};

export function handleError(err: unknown): NextResponse {
  if (err instanceof ApiError) {
    return NextResponse.json(
      { error: err.message },
      { status: err.status }
    );
  }

  // request.json() throws SyntaxError when the JSON is malformed.
  if (err instanceof SyntaxError) {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const databaseError = err as DatabaseError;

  // PostgreSQL unique-constraint violation.
  if (databaseError?.code === '23505') {
    return NextResponse.json(
      { error: 'Restaurant already exists' },
      { status: 409 }
    );
  }

  // Known PostgreSQL input and constraint errors.
  if (
    databaseError?.code === '23502' ||
    databaseError?.code === '23503' ||
    databaseError?.code === '23514' ||
    databaseError?.code === '22P02'
  ) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }

  console.error('Unhandled API error:', err);

  return NextResponse.json(
    { error: 'Internal Server Error' },
    { status: 500 }
  );
}