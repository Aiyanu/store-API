import mongoose, { Schema } from "mongoose";

type nameT={
    type:StringConstructor;
    required:[Boolean,string]
    trim:String,
    maxLength:[number,string]
}
type completedT = {
    type:BooleanConstructor;
    default:Boolean
}

type TaskSchemaType = {
    name:nameT;
    completed:completedT;
}

const TaskSchema  = new Schema<TaskSchemaType>({
    name:{
        type:String,
        required:[true,"Must be provided"],
        trim:"true",
        maxLength:[20,"name cannot be more than 20 characters"]
    },
    completed:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model("Task",TaskSchema)