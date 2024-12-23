const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use(cors());

// connect to mongodb
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  `mongodb+srv://causeBridge:0oKUMEUL2axExtel@cluster0.upkox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const volunteerPostCollection = client.db('causebridgeDB').collection('volunteerPOSTS')

async function run() {
  try {
    // await client.connect();

    // get all volunteer posts from db
    app.get('/volunteer-posts', async (req, res) => {
      const result = await volunteerPostCollection.find().toArray();
      res.send(result)
    })

    // showcase volunteer need 6 posts with upcoming deadlines
    app.get('/upcoming-deadline-posts', async (req, res) => {
      const result = await volunteerPostCollection.find().sort({deadline: 1}).limit(6).toArray();
      res.send(result)
    })
    
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
