import db from "@/lib/db";
import { NextResponse } from "next/server";


// For Edit we getData
export async function GET(request, { params: { id } }) {
    try {
        // findUnique is used to Fetch single vendor
        const vendor = await db.vendor.findUnique({
            where: {
                id,
            },
        });
        console.log(vendor);
        return NextResponse.json(vendor);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Vendor" }, { status: 500 });
    }
}




// Now For Edit we updateData

export async function PUT(request, { params: { id } }) {
    try {
        const {
            title,
            companyName,
            phone,
            email,
            address } = await request.json();
        // update is used to Update single vendor
        const vendor = await db.vendor.update({
            where: {
                id,
            },
            data: {
                title,
                companyName,
                phone,
                email,
                address
            }
        });
        console.log(vendor);
        return NextResponse.json(vendor);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Update the Vendor" }, { status: 500 });
    }
}