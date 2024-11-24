import { Problem } from "@/app/types";
import { datas } from "@/app/utils";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  const uid = (await params).uid
  
  if (!uid) {
    return NextResponse.json({ error: 'uid is not found in cookies' }, { status: 400 });
  }

  try {
    const problems = await datas<Problem>(`users/${uid}/problems`);
   // console.log(problems)
    return NextResponse.json({ data: problems });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch problems' }, { status: 500 });
  }
}