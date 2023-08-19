import { connect, Schema, model } from "mongoose";
import passsportLocalMongoose from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";

connect(
  "mongodb+srv://" +
    process.env.MONGO_USER +
    ":" +
    process.env.MONGO_PASS +
    "@cluster0.inwwyhl.mongodb.net/notesDB?retryWrites=true&w=majority"
);

const noteSchema = new Schema({
  title: String,
  content: String,
});

const userSchema = new Schema({
  email: String,
  password: String,
  googleId: String,
  notes: [noteSchema],
});

userSchema.plugin(passsportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new model("User", userSchema);

export default User;
