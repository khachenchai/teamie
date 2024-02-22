import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "@/app/models/user";
import connectDB from "@/app/api/connect"
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export async function POST(req, res, next) {
    try {
        await connectDB();
        const { email, password } = await req.json();
        console.log(password);
        const existUser = await User.findOne({ email: email });
        console.log(existUser.password);

        if (!existUser) {
            return NextResponse.json({ message: "ไม่พบผู้ใช้", success: false }, { status: 401 })
        }

        const isMatch = await bcrypt.compare(password, existUser.password);
        // console.log();

        if (!isMatch) {
            return NextResponse.json({ message: "รหัสผ่านไม่ตรงกัน", success: false }, { status: 401 })
        }

        const token = jwt.sign({userId: existUser._id}, process.env.SECRET_KEY, {
            expiresIn: '1d'
        })

        cookies().set("token", token, {
            httpOnly: true
        })

        return NextResponse.json({ message: "เข้าสู่ระบบสำเร็จ", success: true, token }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while Logging in", success: false }, { status: 500 })
    }
}