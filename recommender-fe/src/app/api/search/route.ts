import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const url = process.env.RECOMMENDER_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, top_k = 4 } = body;

    const response = await axios.post(`${url}/similar`, { query, top_k });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(`Request for '${url}/similar' failed:`, error);
    return new NextResponse("Something went wrong!", { status: 500 });
  }
}
