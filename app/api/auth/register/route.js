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
        const { prefix, firstname, lastname, email, password } = await req.json();
        const exist = await User.findOne({ email: email });

        if (exist) {
            return NextResponse.json({ message: "มีผู้ใช้งานอีเมลนี้แล้ว" }, { status: 500 })
        }
        console.log(password);
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const config = {
            name: {
                prefix,
                firstname,
                lastname
            },
            email,
            password: hashedPassword
        }
        const newUser = await User.create(config)

        const token = jwt.sign({userId: newUser._id}, process.env.SECRET_KEY, {
            expiresIn: '1d'
        })

        cookies().set("token", token, {
            httpOnly: true
        })

        return NextResponse.json({ message: "ลงทะเบียนสำเร็จ" }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while registering" }, { status: 500 })
    }
}