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
    try {
        await client.connect();

        const touristsSpotCollection = client.db('touristsSpotDB').collection('touristsSpot');
        const countryCollection = client.db('coffeeDB').collection('country');

        app.post('/tourists-spot', async (req, res) => {
            const newTouristsSpot = req.body;
            const result = await touristsSpotCollection.insertOne(newTouristsSpot);
            res.send(result);
        })

        app.get('/tourists-spot', async (req, res) => {

            if (req.query.sortOrder) {
                const sortOrder = req.query.sortOrder || "desc";
                const cursor = touristsSpotCollection.find().sort({ average_cost: sortOrder });
                const result = await cursor.toArray();
                res.send(result);
            } else if (req.query.email) {
                const email = req.query.email;
                const query = { userEmail: email }
                const cursor = touristsSpotCollection.find(query);
                const result = await cursor.toArray();
                res.send(result);
            } else {
                const cursor = touristsSpotCollection.find();
                const result = await cursor.toArray();
                res.send(result);
            }
        })

        app.delete('/tourists-spot/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await touristsSpotCollection.deleteOne(query);
            res.send(result);
        })

        app.get('/tourists-spot/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await touristsSpotCollection.findOne(query);
            res.send(result);
        })

        app.put('/tourists-spot/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updateTouristsSpot = req.body;

            const touristsSpot = {
                $set: {
                    image: updateTouristsSpot.image,
                    tourists_spot_name: updateTouristsSpot.tourists_spot_name,
                    country_Name: updateTouristsSpot.country_Name,
                    short_description: updateTouristsSpot.short_description,
                    average_cost: updateTouristsSpot.average_cost,
                    seasonality: updateTouristsSpot.seasonality,
                    travel_time: updateTouristsSpot.travel_time,
                    totalVisitorsPerYear: updateTouristsSpot.totalVisitorsPerYear
                }
            }

            const result = await touristsSpotCollection.updateOne(filter, touristsSpot, options);
            res.send(result);
        })


        app.get('/country', async (req, res) => {
            const cursor = countryCollection.find();
            const countries = await cursor.toArray();
            res.send(countries);
        })
    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Southeast Explorer server is running')
})

app.listen(port, () => {
    console.log(`Southeast Explorer Server is running on port: ${port}`)
})