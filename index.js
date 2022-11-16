const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const fileUpload = require('express-fileupload');


const app = express();
const port = 5000;



app.use(cors());
app.use(express.json())
app.use(fileUpload())

// const uri = "mongodb+srv://doctoral:doctoral123@cluster0.fbebj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const uri = "mongodb+srv://nj_abaacorp2022:248Ev3rBYUemym4L@cluster0.fbebj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        //----------all collection ------------
        const database = client.db("njabaacorp");
        const blogsCollection = database.collection("blog");
        const instagramCollection = database.collection('instagram');
        const projectCollection = database.collection('project')
        const sliderCollection = database.collection('slider')
        const userCollection = database.collection('users')
        console.log('connected db')

        //------------------ get api----------------
        app.get('/add_blog', async (req, res) => {

            const blogs = blogsCollection.find({});
            const blog = await blogs.toArray();
            res.send(blog)

        })
        app.get('/instagram', async (req, res) => {

            const instagrams = instagramCollection.find({});
            const instagram = await instagrams.toArray();
            res.send(instagram)

        })
        app.get('/project', async (req, res) => {

            const projects = projectCollection.find({});
            const project = await projects.toArray();
            res.send(project)

        })
        app.get('/slider', async (req, res) => {

            const sliders =await sliderCollection.find({});
            const slider = await sliders.toArray();
            res.send(slider)

        })
        //// find single data
        app.get('/add_blog/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const blog = await blogsCollection.findOne(query);
            res.json(blog);
        })
        app.get('/add_instagram/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const instagram = await instagramCollection.findOne(query);
            res.json(instagram);
        })
        app.get('/add_project/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const project = await projectCollection.findOne(query);
            res.json(project);
        })
        app.get('/add_slider/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const slider = await sliderCollection.findOne(query);
            res.json(slider);
        })



        //---------------- post api start--------------------



        app.post('/add_blog', async (req, res) => {



            const { title, dec, date } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')

            const newBlog = { title, dec, date, img: imgBuffer }

            const result = await blogsCollection.insertOne(newBlog);
            res.json({ success: true })


            console.log('hitt post api', result.insertedId)
            // res.send(result)

        })
        app.post('/instagram', async (req, res) => {



            const { title, link } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')

            const newInstagramCard = { title, link, img: imgBuffer }

            const result = await instagramCollection.insertOne(newInstagramCard);
            res.json({ success: true })


            console.log('hitt post api', result.insertedId)
            // res.send(result)

        })
        app.post('/project', async (req, res) => {


            const { title, link } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')

            const newProject = { title, link, img: imgBuffer }

            const result = await projectCollection.insertOne(newProject);
            res.json({ success: true })


            console.log('hitt post api', result.insertedId)
            // res.send(result)

        })
        app.post('/slider', async (req, res) => {


            const { title, dec } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')

            const newSlider = { title, dec, img: imgBuffer }

            const result = await sliderCollection.insertOne(newSlider);
            res.json({ success: true })


            console.log('hitt post api', result.insertedId)
            // res.send(result)

        })
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user)
            res.json(result)
            console.log(result)
        })

        //new
        app.get('/users', async (req, res) => {
            const result = await userCollection.find({}).toArray()
            res.json(result)
            console.log(result)
        })


        //---------------- post api end--------------------



        //-------------- put api start---------------



        app.put('/update_blog/:id', async (req, res) => {

            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true }

            const { title, dec, date } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')

            const newBlog = { title, dec, date, img: imgBuffer }
            const updatedBlog = {
                $set: newBlog
            };
            const result = await blogsCollection.updateOne(filter, updatedBlog, options);

            //    res.send(result)
            //     console.log(result.acknowledged)
            res.json({ success: true })

        })
        app.put('/update_instagram/:id', async (req, res) => {

            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true }

            const { title, link } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')

            const newInstagramCard = { title, link, img: imgBuffer }
            const updatedInstagram = {
                $set: newInstagramCard
            };
            const result = await instagramCollection.updateOne(filter, updatedInstagram, options);

            //    res.send(result)
            console.log(result.acknowledged)
            res.json({ success: true })

        })
        app.put('/update_project/:id', async (req, res) => {

            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true }

            const { title, link } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')

            const newProject = { title, link, img: imgBuffer }
            const updatedProject = {
                $set: newProject
            };
            const result = await projectCollection.updateOne(filter, updatedProject, options);

            //    res.send(result)
            console.log(result.acknowledged)
            res.json({ success: true })

        })
        app.put('/update_slider/:id', async (req, res) => {

            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true }

            const { title, dec } = req.body;
            const pic = req.files.img;
            const picData = pic.data;
            const encodePic = picData.toString('base64');
            const imgBuffer = Buffer.from(encodePic, 'base64')

            const newSlider = { title, dec, img: imgBuffer }
            const updatedSlider = {
                $set: newSlider
            };
            const result = await sliderCollection.updateOne(filter, updatedSlider, options);

            //    res.send(result)
            console.log(result.acknowledged)
            res.json({ success: true })

        })

        app.put('/users', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email }
            const options = { upsert: true }
            const updateUser = { $set: user }
            const result = await userCollection.updateOne(filter, updateUser, options);
            res.json(result);
            console.log(result)

        })
        app.put('/users/admin', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email }

            const updateUser = { $set: { role: 'admin' } }
            const result = await userCollection.updateOne(filter, updateUser);
            res.json(result);
            console.log(result)

        })

        //-------------- put api end---------------


        //--------------- delete api start ------------------



        app.delete('/blog_delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await blogsCollection.deleteOne(query);
            console.log(result)
        })
        app.delete('/instagram_delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await instagramCollection.deleteOne(query);
            console.log(result)
        })
        app.delete('/project_delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await projectCollection.deleteOne(query);
            console.log(result)
        })
        app.delete('/slider_delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await sliderCollection.deleteOne(query);
            console.log(result)
        })



        //------------------ delete api end----------------
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running server')
});

app.listen(port, () => {
    console.log('runnning server on port', port);
})