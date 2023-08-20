import { Router } from "express";
import { db } from "../db";
import querystring from "querystring";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import {
  notes,
  notesRelations,
  todos,
  user,
  userRelations,
} from "../db/schema";
import * as schema from "../db/schema";
import { RequestWithToken, RequestWithUser } from "../types";
const router = Router();
// get notes
router.get("/get_notes", async (req: RequestWithToken, res) => {
  try {
    const user = jwt.verify(req.token as string, "testsecret") as user;
    const allNotes = await db.query.user.findFirst({
      where: eq(schema.user.id, user.id),
      with: {
        notes: true,
      },
    });
    res.send({
      userId: user.id,
      notes: allNotes.notes,
    });
  } catch (err) {
    res.send({ message: "error ", err }).status(400);
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
    res.send("Successfully updated note").status(200);
  } catch (error) {
    res.send({ message: "error " + error });
  }
});
/*
todos functionalities (CRUD Operation)
*/
// get notes
router.get("/get_todos", async (req: RequestWithUser, res) => {
  try {
    const userData = await db.query.user.findMany({
      with: {
        todos: true,
      },
      where: eq(req.user.id, user.id),
    });
    res
      .status(200)
      .send({ message: "successfuly get todo", todos: userData[0].todos });
  } catch (error) {
    console.log(req.user, req.cookies);
    res.send({ message: "Error" + error }).status(400);
  }
});
// add new notes
router.post("/add_todos", async (req: RequestWithUser, res) => {
  try {
    const { title, description } = req.body;
    const authorId = req.user.id;
    console.log(authorId);
    const newNote = await db
      .insert(todos)
      .values({
        authorId,
        description,
        title,
      })
      .returning();
    return res
      .send({
        message: "created new todos",
        id: newNote[0].id,
      })
      .status(200);
  } catch (error) {
    res.send({ message: "error" + error }).status(400);
  }
});
// delete existing note
router.delete("/delete_todos", async (req: RequestWithUser, res) => {
  try {
    const { rowId } = req.body;
    const deletedTodo = await db
      .delete(notes)
      .where(eq(rowId, notes.id))
      .returning();

    return res
      .send({
        message: "deleted todos with rowId + " + rowId,
        id: deletedTodo[0].id,
      })
      .status(200);
  } catch (error) {
    res.send({
      message: "error " + error,
    });
  }
});
// update note
router.patch("/update_todos/:id", async (req: RequestWithUser, res) => {
  try {
    const { selectedTodoId, title, description, body } = req.body;
    const date_updated = new Date().toDateString();

    const updatedTodo = await db
      .update(todos)
      .set({
        description,
        title,
        date_updated,
      })
      .where(eq(todos.id, selectedTodoId))
      .returning();
    res
      .send({
        message: "todos with id:" + updatedTodo[0].id,
      })
      .status(200);
  } catch (error) {
    res.send({ message: "error " + error });
  }
});
export default router;
