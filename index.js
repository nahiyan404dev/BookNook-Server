import express from 'express'
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors'
import 'dotenv/config'
const app = express()
const PORT = 5000;

app.use(cors());
app.use(express.json())



const client = new MongoClient(process.env.MONGODB_URL);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
const mongoClient = await connectToMongoDB();

const db =mongoClient.db('BookNook-Library')

const addBookCollection= db.collection('books')
//http://localhost:5000/Add-Books

// const verifyApi = async(res,req,next)=>{
//  const authHeader = req.headers.authorization;
//  console.log(authHeader);
//  if(authHeader !== "user logged in"){
//   return res.status(401).send({massage:"Unauthorized!"});
//  }
//  console.log('i am middleware')
//  next();
// };

app.post('/add-books',async(req,res)=>{
  const data =req.body

  const result = await addBookCollection.insertOne(data);
  console.log(result);


  res.send(result);
})
app.get('/books',async(req,res)=>{
  const result = await addBookCollection.find().toArray()
  res.send(result)
})


app.get('/books/:id', async(req,res)=>{
  const {id} = req.params
  const result = await addBookCollection.findOne({_id: new ObjectId(id)});
  res.send(result);
})

app.get('/',(req,res)=>{
    res.send({message: 'Server is running okay!'})
})
app.listen(PORT,()=>{

    console.log(`Server is running at ${PORT}`)
})