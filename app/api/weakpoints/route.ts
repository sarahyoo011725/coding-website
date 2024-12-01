import { db } from "@/app/firebase";
import { Weakness } from "@/app/types";
import { converter } from "@/app/utils";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.nextUrl);
    const uid = url.searchParams.get('uid');

    try {
        const userDoc = await getDoc(doc(db, `users/${uid}`));
        if (userDoc.exists()) {
            const weaknesses = userDoc.data().weaknesses as string[];
            return NextResponse.json({ data: weaknesses }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'This user does not exist' }, { status: 404 });
        }
    } catch(e) {
        return NextResponse.json({ error: 'Failed to fetch weaknesses' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const url = new URL(req.nextUrl);
    const uid = url.searchParams.get('uid');
    const weakness = await req.json();

    try {
        const docRef = doc(db, `users/${uid}`).withConverter(converter<Weakness[]>());
        await updateDoc(docRef, {
            'weaknesses': arrayUnion(weakness.weakness)
        });
        return NextResponse.json({ staus: 201 });
    } catch(e) {
        return NextResponse.json({ error: 'Failed to upload weakpoint' }, { status: 500 });
    }
}