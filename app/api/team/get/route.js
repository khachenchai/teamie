import connectDB from "@/app/api/connect"
import {NextResponse} from 'next/server'
import jwt from "jsonwebtoken"
import Team from "@/app/models/team";
import User from "@/app/models/user";

export async function GET(req) {
    try {
        await connectDB();
        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.get("team_id");
        const data = query
            ? await Team.findById(query).populate('members').populate('owner_id')
            : await Team.find().populate('members').populate('owner_id')
        
        // console.log(teams);

        return NextResponse.json({ data: data }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while fetching" }, { status: 500 })
    }
}