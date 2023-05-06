const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

//Connecting to MongoDB
const dbURI =
  "mongodb+srv://admin_username:password@myblog.widod.mongodb.net/myblog_db?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//Using the view engine - ejs, define it explicitly
app.set("view engine", "ejs");

//Defining css or any public accessible files
app.use(express.static("styles"));

//Post request url encoder
app.use(express.urlencoded({ extended: true }));

//Using Middleware
app.use(morgan("dev"));

//importing blog routes
app.use(blogRoutes);

//Error page - all undefined pages go to this page
app.use((req, res) => {
  const tab_stats = {
    tab_home: "inactive",
    tab_about: "inactive",
    tab_create: "inactive",
    tab_blogs: "inactive",
  };
  res.status(404).render("404", { title: "404 Error", tab_stats });
});

/*
//Using node js way of routing the homepages
app.get('/', (req,res) => {
    res.send('<p>Home</p>');   
    res.sendFile('./views/index.html', { root:__dirname});   
});

app.get('/about', (req,res) => {
    res.send('<p>Home</p>');   
    res.sendFile('./views/about.html', { root:__dirname});   
});

//redirecting page example
app.get('/about-us', (req,res) => {
    //res.send('<p>Home</p>');   
    res.redirect('/about');   
});

app.get('/blog/create', (req,res) => {
    res.send('<p>Home</p>');   
    res.sendFile('./views/about.html', { root:__dirname});   
});

//Error page -all undefined pages go to this page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root:__dirname}); 
});

****************************************************************************** 
*/

/*
//Testing the mongodb - adding objects
app.get('/add-blog', (req, res) => {
    const blog = new MyBlog({
        title: 'ANOTHER NEWwww',
        snippet: 'ANOTHER  NEWww snippet',
        body: 'ANOTHER  newwwwWW body'    

    })

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

//Testing the mongodb - getting all objects
app.get('/all-blogs', (req, res) => {
    MyBlog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});

//Testing the mongodb - getting single objects
app.get('/single-blog', (req,res) => {
    MyBlog.findById('627645b0a78f03176be0fe4f')
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });        
})

********************************************************************* 
*/
