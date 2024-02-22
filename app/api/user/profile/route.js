import jwt from "jsonwebtoken";
import User from "@/app/models/user";
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        const auth = req.cookies.get('token');

        if (!auth) {
            return NextResponse.json({ error: "Please login first" }, { status: 401 })
        }
        const { userId } = await jwt.verify(auth.value, process.env.SECRET_KEY)

        const existUser = await User.findOne({ _id: userId }).select('name email')
        console.log(existUser);

        if (!existUser) {
            return NextResponse.json({ error: "User not exist" }, { status: 401 })
        }

        return NextResponse.json({ userData: existUser, name: `${existUser.name.prefix}${existUser.name.firstname} ${existUser.name.lastname}` }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}