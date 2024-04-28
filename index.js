const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fgzyiou.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try{
        await client.connect();

        const touristsSpotCollection = client.db('touristsSpotDB').collection('touristsSpot');

        app.post('/tourists-spot', async (req, res) => {
            const newTouristsSpot = req.body;
            const result = await touristsSpotCollection.insertOne(newTouristsSpot);
            res.send(result);
        })

        app.get('/tourists-spot', async (req, res) => {
            const cursor = touristsSpotCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Southeast Explorer server is running')
})

app.listen(port, () => {
    console.log(`Southeast Explorer Server is running on port: ${port}`)
})