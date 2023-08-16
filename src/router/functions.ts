import { Router } from "express";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { user } from "../db/schema";

const router = Router();

// get notes
router.get("/get_notes", async (req, res) => {
  try {
    const currentUser = req.user;
    console.log(currentUser)
    const notes = await db.query.user.findMany({
      where: eq(currentUser.id, user.id),
      with: {
        notes: true,
      },
    });
    res
      .send({
        notes,
      })
      .status(200);
  } catch (error) {
    res.send({ message: "Error" + error }).status(400);
  }
});
// add new notes

// delete existing note

// update note

/*
todos functionalities (CRUD Operation)
*/

export default router