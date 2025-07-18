import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Feature from '@/models/Feature';

export async function GET() {
  try {
    await dbConnect();
    const features = await Feature.find();
    return NextResponse.json(features);
  } catch (error) {
    console.error('GET /api/features error:', error);
    return NextResponse.json({ error: 'Failed to fetch features' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, features } = body;

    if (!name?.en || !features?.en || typeof features.en !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid "features.en"' }, { status: 400 });
    }

    const newFeature = await Feature.create({ name, features });
    return NextResponse.json(newFeature, { status: 201 });
  } catch (error) {
    console.error('POST /api/features error:', error);
    return NextResponse.json({ error: 'Failed to create feature' }, { status: 500 });
  }
}
