import { signinInput, signupInput } from "@aseem77/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { Jwt } from "hono/utils/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ error: "Invalid inputs..." });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    const token = await Jwt.sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.text(token);
  } catch (err) {
    c.status(403);
    c.text("Invalid");
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ error: "Invalid inputs..." });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!foundUser) {
      c.status(403);
      return c.json({ error: "Incorrect creds" });
    }

    const token = await Jwt.sign(
      {
        id: foundUser.id,
      },
      c.env.JWT_SECRET
    );

    return c.text(token);
  } catch (err) {
    c.status(403);
    return c.json({
      msg: "Invalid",
    });
  }
});

userRouter.post("/find", async (c) => {
  const { id } = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!foundUser) {
      return c.json({
        msg: "User not found",
      });
    }
    return c.json({ foundUser });
  } catch (e) {
    console.log("Something's Wrong");
    return c.text("Error: " + e);
  }
});
