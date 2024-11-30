import { db } from "@/app/firebase";
import { Topic } from "@/app/types";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.nextUrl);
    const uid = url.searchParams.get('uid');
    
    try {
        const docSnapshot = await getDoc(doc(db, `users/${uid}`));
        if (docSnapshot.exists()) {
            const topics = docSnapshot.data().topics as Topic[];
            return NextResponse.json({ data: topics }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'This user does not exist' }, { status: 404 });
        }
    } catch(e) {
        return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 });
    }
}