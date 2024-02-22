import connectDB from "@/app/api/connect"
import Team from "@/app/models/team";
import {NextResponse} from 'next/server'
import jwt from "jsonwebtoken"
import User from "@/app/models/user";

export async function POST(req, res, next) {
    try {
        await connectDB();
        const { name, description, password } = await req.json();
        const auth = req.cookies.get('token');

        if (!auth) {
            return NextResponse.json({ error: "Please login first" }, { status: 401 })
        }
        const { userId } = await jwt.verify(auth.value, process.env.SECRET_KEY)

        const existUser = await User.findOne({ _id: userId }).select('name email')

        if (!existUser) {
            return NextResponse.json({ error: "User not exist" }, { status: 401 })
        }
        
        const config = {
            name,
            description,
            password,
            owner_id: existUser._id,
            members: [
                existUser._id
            ]
        }
        console.log(existUser);

        const newTeam = await Team.create(config)

        return NextResponse.json({ message: newTeam }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while creating" }, { status: 500 })
    }
}