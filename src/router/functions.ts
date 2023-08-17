import { Router } from "express";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { notes, notesRelations, user, userRelations } from "../db/schema";

const router = Router();

// get notes
router.get("/get_notes", async (req, res) => {
  try {
    const currentUser = req.user;
    console.log(currentUser);
    const note = await db.query.user.findMany({
      where: eq(currentUser.id, user.id),
      with: {
        notes: true,
      },
    });
    res
      .send({
        notes: note[0].notes,
      })
      .status(200);
  } catch (error) {
    res.send({ message: "Error" + error }).status(400);
  }
});
// add new notes

router.post("/add_notes", async (req, res) => {
  try {
    const { title, description, body } = req.body;
    const newNote = await db.transaction(async (tx) => {});
    return res
      .send({
        message: "created new notes",
        newNote,
      })
      .status(200);
  } catch (error) {
    res.send({ message: "error" + error }).status(400);
  }
});
// delete existing note

// update note

/*
todos functionalities (CRUD Operation)
*/

export default router;
