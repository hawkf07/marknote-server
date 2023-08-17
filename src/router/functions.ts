import { Router } from "express";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { notes, notesRelations, user, userRelations } from "../db/schema";
import { RequestWithUser } from "../types";

const router = Router();

// get notes
router.get("/get_notes", async (req: RequestWithUser, res) => {
  try {
    const userData = await db.query.user.findMany({
      with: {
        notes: true,
      },
      where: eq(req.user.id, user.id),
    });
    res.status(200).send({ message: "successfuly get notes", userData });
  } catch (error) {
    console.log(req.user, req.cookies);
    res.send({ message: "Error" + error }).status(400);
  }
});
// add new notes
router.post("/add_notes", async (req: RequestWithUser, res) => {
  try {
    const { title, description, body } = req.body;
    const authorId = req.user.id;
    console.log(authorId);
    const newNote = await db.transaction(async (tx) => {
      return await tx.insert(notes).values({
        title,
        description,
        body,
        authorId,
      });
    });
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
router.delete("/delete_notes", async (req: RequestWithUser, res) => {
  try {
    const { rowId } = req.body;
    const deletedNotes = await db
      .delete(notes)
      .where(eq(rowId, notes.id))
      .returning();

    return res
      .send({
        message: "deleted note with rowId + " + rowId,
      })
      .status(200);
  } catch (error) {
    res.send({
      message: "error " + error,
    });
  }
});
// update note
router.patch("/update_notes", async (req: RequestWithUser, res) => {
  try {
    const { authorId, selectedNoteId, title, description, body } = req.body;
    const date_updated = new Date().toDateString();

    const updatedNote = await db
      .update(notes)
      .set({
        body,
        description,
        title,
        date_updated,
      })
      .where(eq(notes.id, selectedNoteId));
      res.send("Successfully updated note").status(200)
  } catch (error) {
    res.send({ message: "error " + error });
  }
});
/*
todos functionalities (CRUD Operation)
*/

export default router;
