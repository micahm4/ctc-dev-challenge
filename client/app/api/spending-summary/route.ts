import { NextResponse } from 'next/server';
import { pool } from '@/db/pool';
import { handleError } from '@/lib/errors';
import type { SpendingSummary } from '@/lib/types';

/**
 * GET /api/spending-summary
 * Returns overall spending statistics across all visits.
 */
export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT
         COALESCE(SUM("amountSpent"), 0) AS "totalSpent",
         COUNT(*) AS "visitCount",
         COALESCE(AVG("amountSpent"), 0) AS "averageSpent"
       FROM visits`
    );

    const summary: SpendingSummary = {
      totalSpent: Number(rows[0].totalSpent),
      visitCount: Number(rows[0].visitCount),
      averageSpent: Number(rows[0].averageSpent),
    };

    return NextResponse.json(summary);
  } catch (error) {
    return handleError(error);
  }
}