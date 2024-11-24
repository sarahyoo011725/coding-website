import { Problem } from "@/app/types";
import { data } from "@/app/utils";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ uid: string, id: string }> }
) { 
    const uid = (await params).uid;
    const id = (await params).id;
    
    if (!uid) {
        return NextResponse.json({ error: 'uid is not found in cookies' }, { status: 400 });
    }

    try {
        const result = await data<Problem>(`users/${uid}/problems`, id);
        return NextResponse.json({ data: result });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to fetch problem' }, { status: 500 });
    }
}