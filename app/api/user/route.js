import db from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { name, email, password, companyName } = await request.json();

        // Check if user email already Exists
        const userExist = await db.User.findUnique({
            where: {
                email,
            },
        });
        if (userExist) {
            return NextResponse.json({
                message: "User already exists",
                user: null
            }, { status: 409 })
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await db.User.create({
            data: {
                name,
                email,
                hashedPassword,
                companyName,
            }
        });
        console.log(newUser);
        return NextResponse.json(newUser);
    } catch (error) {
        console.log(error);
        // return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ error}, { status: 500 });
    }
}

