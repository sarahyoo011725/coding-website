import { db } from "@/app/firebase";
import { Problem } from "@/app/types";
import { converter } from "@/app/utils";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    const url = new URL(req.nextUrl);
    const uid = url.searchParams.get('uid');
    const pid = url.searchParams.get('pid');
    const body = await req.json();
    
    try {
        const docRef = doc(db, `users/${uid}/problems/${pid}`);
        await updateDoc(docRef.withConverter(converter<Problem>()), {
            status: body.status
        });
        return NextResponse.json({ staus: 201 });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
    }
}