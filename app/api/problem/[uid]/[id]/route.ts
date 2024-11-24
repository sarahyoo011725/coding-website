import { db } from "@/app/firebase";
import { Problem } from "@/app/types";
import { data } from "@/app/utils";
import { deleteDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ uid: string, id: string }> }
) { 
    const uid = (await params).uid;
    const id = (await params).id;
    
    if (!uid || !id) {
        return NextResponse.json({ error: 'uid or id is not found in params' }, { status: 400 });
    }

    try {
        const result = await data<Problem>(`users/${uid}/problems`, id);
        return NextResponse.json({ data: result }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to fetch problem' }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ uid: string, id: string }> }
) { 
    const uid = (await params).uid;
    const id = (await params).id;
    
    if (!uid || !id) {
        return NextResponse.json({ error: 'uid or id is not found in params' }, { status: 400 });
    }

    try {
        await deleteDoc(doc(db, `users/${uid}/problems/${id}`));
        return NextResponse.json({ status: 204 });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to delete problem' }, { status: 500 });
    }
}
