import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req) {
  try {
    const data = await req.json();
    const {_id, name, image, ...otherUserInfo} = data; 

    const session = await getServerSession(authOptions); 
    let filterUser = _id ? { id: Number(_id) } : { email: session.user.email }; 

    const user = await prisma.User.findUnique({
      where: filterUser
    });

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    await prisma.User.update({
      where: filterUser, 
      data: {
        name: name, 
        image: image,
      }
    }); 

    await prisma.UserInfo.upsert({
      where: {
        email: user.email 
      },
      update: otherUserInfo, 
      create: {
        email: user.email, 
        ...otherUserInfo, 
      },
    });

    return Response.json(true); 
  } catch (error) {
    console.error(error); 
    return Response.json({ message: "Error fetching user data", error: error.message }, { status: 500});
  }
}


export async function GET(req) {
  const url = new URL(req.url); 
  const _id = url.searchParams.get('_id'); 

  const session = await getServerSession(authOptions); 
  const filterUser = _id ? { id: Number(_id) } : { email: session?.user?.email };

  if (!filterUser.email && !filterUser.id) {
    return Response.json({}); 
  }

  try {
    const user = await prisma.User.findUnique({
      where: filterUser,
    }); 

    if (!user) {
      return Response.json({ message: "User not found!" }, { status: 404 }); 
    }

    const userInfo = await prisma.UserInfo.findUnique({
      where: {
        email: user.email 
      }
    });

    return Response.json({ ...user, ...userInfo });
  } catch (error) {
    console.error(error); 
    return Response.json({ message: "Error fetching user data", error: error.message }, { status: 500});
  }
}