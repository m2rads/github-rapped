import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
    const {username} = await req.json();

    return new NextResponse(JSON.stringify({
        username,
    }), {
        status: 200,
        headers: {
        'Content-Type': 'application/json',
        },
    });
    
}