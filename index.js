require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use(cors());

// connect to mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://causeBridge:0oKUMEUL2axExtel@cluster0.upkox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const volunteerNeededPostCollection = client
  .db("causebridgeDB")
  .collection("volunteerPOSTS");
const volunteerRequestsCollection = client
  .db("causebridgeDB")
  .collection("volunteerRequests");

async function run() {
  try {
    // await client.connect();

    // get all volunteer posts from db
    app.get("/volunteer-need-posts", async (req, res) => {
      const result = await volunteerNeededPostCollection.find().toArray();
      res.send(result);
    });

    // get specific post using id from db
    app.get("/volunteer-need-posts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await volunteerNeededPostCollection.findOne(query);
      res.send(result);
    });

    // get specific user posts using email
    app.get("/get-specific-user-post/:email", async (req, res) => {
      const email = req.params.email;
      const query = { organizerEmail: email };
      const result = await volunteerNeededPostCollection.find(query).toArray();
      res.send(result);
    });

    // get specific user request to be a volunteer using email
    app.get("/volunteer-request-posts/:email", async (req, res) => {
      const email = req.params.email;
      const query = { volunteerEmail: email };
      const result = await volunteerRequestsCollection.find(query).toArray();
      res.send(result);
    });

    // showcase volunteer need 6 posts with upcoming deadlines
    app.get("/upcoming-deadline-posts", async (req, res) => {
      const result = await volunteerNeededPostCollection
        .find()
        .sort({ deadline: 1 })
        .limit(6)
        .toArray();
      res.send(result);
    });

    // post a single volunteer needed post in db
    app.post("/add-volunteer-needed-post", async (req, res) => {
      const postData = req.body;
      const result = await volunteerNeededPostCollection.insertOne(postData);
      res.send(result);
    });

    // post a volunteer request in db
    app.post("/volunteer-request", async (req, res) => {
      const postData = req.body;

      // inserted request data
      const result = await volunteerRequestsCollection.insertOne(postData);

      // decrease volunteersNeeded number from main post
      const filter = { _id: new ObjectId(postData.postId) }
      const update = {
        $inc: {volunteersNeeded: -1}
      } 
      const updateVolunteerNeededNumber = await volunteerNeededPostCollection.updateOne(filter, update)

      res.send(result);
    });

    // update a single volunteer needed post in db
    app.patch("/update-my-posts/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const postData = req.body;
      const updateData = {
        $set: postData,
      };
      const result = await volunteerNeededPostCollection.updateOne(
        query,
        updateData,
        options
      );
      res.send(result);
    });

    // delete specific single post by id
    app.delete("/delete-specific-post/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await volunteerNeededPostCollection.deleteOne(query);
      res.send(result);
    });

    app.delete("/delete-specific-request/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await volunteerRequestsCollection.deleteOne(query);
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("CauseBridge Server is running......");
});

app.listen(port, () => {
  console.log(`CauseBridge Server is running on port ${port}`);
});
