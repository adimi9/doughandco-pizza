import {authOptions, isAdmin} from "@/app/api/auth/[...nextauth]/route";
import {getServerSession} from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const admin = await isAdmin();

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');

    try {
        if (_id) {
            const order = await prisma.Order.findUnique({
                    where: { id: Number(_id) },
                });
                return Response.json(order || {});
            }

            if (admin) {
                const orders = await prisma.Order.findMany();
                return Response.json(orders);
            }

            if (userEmail) {
                const userOrders = await prisma.Order.findMany({
                    where: { userEmail },
                });
                return Response.json(userOrders);
            }

            return Response.json({ error: "Invalid request" }, { status: 400 });
            
    } catch(error) {
        console.error(error); 
    }

}
