import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // here our schema name is title not name thats why we use title instead of name
        const { title, companyName, phone, email, address, contactPerson, vendorCode, paymentTerms, taxID, notes, } = await request.json();
        // const vendors = { name, companyName, phone, email, address, contactPerson, vendorCode,paymentTerms, taxID, notes, };
        const vendor = await db.vendor.create({
            data: {
                title, companyName, phone, email, address, contactPerson, vendorCode, paymentTerms, taxID, notes,
            }
        });
        console.log(vendor);
        return NextResponse.json(vendor);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to create a Vendor" }, { status: 500 });
    }
}




export async function GET(request) {
    try {
        // findMany is used to Fetch all the suppliers
        const vendors = await db.vendor.findMany({
            orderBy: {
                createdAt: 'desc', // Latest Suppliers Show First'asc' for ascending, 'desc' for descending
            },
        });
        console.log(vendors);
        return NextResponse.json(vendors);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Fetch the Vendor" }, { status: 500 });
    }
}




export async function DELETE(request) {
    try {
        // How to get the ID from search Params
        const id = request.nextUrl.searchParams.get("id")
        const deletedVendor = await db.vendor.delete({
            where: {
                id,
            },
        })
        console.log(deletedVendor);
        return NextResponse.json(deletedVendor);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error, message: "Failed to Delete the Vendor" }, { status: 500 });
    }
}
