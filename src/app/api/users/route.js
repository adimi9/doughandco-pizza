import {isAdmin} from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  if (await isAdmin()) {
    try { 
        const users = await prisma.User.findMany(); 
        return Response.json(users); 
      } catch(error) {
        console.error(error); 
        return Response.json({ message: "Failed to fetch users.", error: error.message }, { status: 500});
      }
  } 

  return Response.json({ message: "Unauthorized." }, { status: 403});

}