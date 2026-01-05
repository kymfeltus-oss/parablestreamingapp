import { NextResponse } from 'next/server'

/**
 * TEMPORARY STUB
 *
 * Textract is intentionally disabled to unblock AWS Amplify builds.
 * The original Textract parsing logic will be restored once
 * @aws-sdk/client-textract is installed and configured in production.
 */

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: 'Document parsing temporarily disabled',
      reason: 'AWS Textract not enabled in this deployment',
    },
    { status: 503 }
  )
}
