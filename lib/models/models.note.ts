import { models, model, Schema } from "mongoose"


const NotesSchema = new Schema({
    title: { type: String, required: true },
    tag: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true })


const Notes = models.Notes || model("Notes", NotesSchema)
export default Notes