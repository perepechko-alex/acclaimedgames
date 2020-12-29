import mongoose from "mongoose";
const { Schema } = mongoose;

// TODO: Make connection string an environment variable
const options = {
  useNewUrlParser: true,
  autoIndex: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const mongoURI = "mongodb://localhost/acclaimedGames";
export const conn = mongoose.createConnection(mongoURI, options);

// const db = mongoose.connection;

const goatSchema = new Schema({
  fileName: String,
  listYear: Number,
  rank: Number,
  name: String,
  weightedPoints: Number,
});

const gotySchema = new Schema({
  fileName: String,
  publication: String,
  name: String,
  points: Number,
});

goatSchema.index(
  { fileName: 1, name: 1 },
  { unique: true, name: "goatPrimaryKey" }
);
gotySchema.index(
  { fileName: 1, name: 1, publication: 1, points: 1 },
  { unique: true, name: "gotyPrimaryKey" }
);
export const GOATGame = mongoose.model("GOAT", goatSchema);
export const GOTYGame = mongoose.model("GOTY", gotySchema);

conn.on("error", console.error.bind(console, "connection error: "));
conn
  .once("connected", async function () {
    conn.db.listCollections().toArray(async function (err, collectionNames) {
      if (err) {
        console.log(err);
        return;
      }
      // console.log(collectionNames);
      // if (collectionNames) {
      //   await GOATGame.collection.drop();
      //   await GOTYGame.collection.drop();
      // }
    });
    console.log("Database is open!");
  })
  .on("close", () => {
    console.info("MongoDB Closed!");
  });

export const client = mongoose.connect(mongoURI, options);
