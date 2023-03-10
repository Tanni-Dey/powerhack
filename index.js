const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(cors())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1tyqf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const billsCollection = client.db("powerhack").collection("bills");

        app.get('/billinglist', async (req, res) => {
            const query = {}
            const allBills = await billsCollection.find(query).toArray()
            res.send(allBills)
        })
    }

    finally {

    }

}
run().catch(console.dir)




app.get('/', (req, res) => {
    res.send('power hack')
})

app.listen(port, () => {
    console.log('power hack', port);
})