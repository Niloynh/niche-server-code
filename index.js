const express = require('express')
const { MongoClient } = require('mongodb');
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId;
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000


// middleWare 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wvgc4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("autlines");
      const productsCollection = database.collection("products");
      const ordersCollection = database.collection("orders");
      const reviewCollection = database.collection("review");
      const usersCollection = database.collection("users");
        
    //  PRODUCTS GET API 
        app.get('/products' , async(req , res)=>{
            const cursor = productsCollection.find({})
            const product = await cursor.toArray()
            res.json(product);
        
        })
    // PRODUCTS POST API 
        app.post('/products' , async(req , res)=>{
            const product = req.body
            const result = await productsCollection.insertOne(product)
            res.json(result)
        
        })
    // REVIEW GET API 
        app.get('/review' , async(req , res)=>{
            const cursor = reviewCollection.find({})
            const review = await cursor.toArray()
           res.json(review)
        
        })
    // Review POST API 
         app.post('/review' , async(req , res)=>{
            const review = req.body
            const result = await reviewCollection.insertOne(review)
            res.json(result)
        
        })

    // Orders GET API 
        app.get('/orders' , async(req , res)=>{
            const cursor = ordersCollection.find({})
            const order = await cursor.toArray()
           res.json(order)
        
        })

    // ORDERS POST API 
        app.post('/orders' , async(req , res)=>{
            const orders = req.body
            const result = await ordersCollection.insertOne(orders)
            res.json(result)
        
        })
    // USERS POST API 
        app.post('/users' , async(req , res)=>{
            const user = req.body
            const result = await usersCollection.insertOne(user)
            res.json(result)
        
        })
    // USERS PUT API
        app.put('/users/admin', async(req, res) => {
            const user = req.body 
            console.log('put', user)
            const filter = { email: user.email };
            const updateDoc = { $set: { role: 'admin' } };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.json(result);
        }); 

    // // DELETE API 
        app.delete('/review/:id', async(req, res) => {
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const result = await reviewCollection.deleteOne(query)
            res.send(result);
        });
    // // DELETE API 
        app.delete('/products/:id', async(req, res) => {
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const result = await productsCollection.deleteOne(query)
            res.send(result);
        });
    // // DELETE API 
        app.delete('/orders/:id', async(req, res) => {
            const id = req.params.id
            const query = {_id: ObjectId(id)}
            const result = await ordersCollection.deleteOne(query)
            res.send(result);
        });
      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})


app.listen(port , ()=> console.log('> Server is up and running on port : ' + port))