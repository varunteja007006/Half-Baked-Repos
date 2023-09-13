const express = require('express');
const router = express.Router();
const blogController = require('../contollers/blogControllers')

//Using contollers
router.get('/', blogController.blog_index);

//about page 
router.get('/about', blogController.blog_about);

//blog creation page
router.get('/blog/create', blogController.blog_create);

//Blog creation post request
router.post('/blogs', blogController.blog_create_post);

//All blogs page
router.get('/blogs', blogController.blog_all);

//Individual blogs view page
router.get('/blogs/:id', blogController.blog_detailview);

//Blog detail view delete
router.delete('/blogs/:id', blogController.blog_detailview_delete)










//ejs way of rendering the pages without controller

//Homepage
//router.get('/', (req,res) => {   
//    //sample way of passing the static data into template
//    const blogs =[
//        {title:'Static First Blog', snippet: 'Ultrices id ridiculus morbi donec ex penatibus natoque ad.' },
//        {title:'Static Second Blog', snippet: 'Platea potenti posuere tristique mollis laoreet mauris porttitor fermentum dignissim est dui.' },
//        {title:'Static Third Blog', snippet: 'Quis hac commodo fames dictum primis.' }
//    ];
//    const tab_stats ={tab_home: "active", tab_about: "inactive", tab_create: "inactive", tab_blogs: "inactive"};
//
//    res.render('index', {title: "Home", tab_stats, blogs});   
//});

//about page 
//router.get('/about', (req,res) => {   
//    const tab_stats ={tab_home: "inactive", tab_about: "active", tab_create: "inactive", tab_blogs: "inactive"};
//
//    res.render('about', {title: "About", tab_stats});   
//});

//blog creation page
//router.get('/blog/create', (req,res) => { 
//    const tab_stats ={tab_home: "inactive", tab_about: "inactive", tab_create: "active", tab_blogs: "inactive"};    
//
//    res.render('create', {title: "Create Blog", tab_stats});   
//});

//All blogs page
//router.get('/blogs', (req,res) => {
//    MyBlog.find().sort({createdAt: -1})
//        .then((result) => {
//            const tab_stats ={tab_home: "inactive", tab_about: "inactive", tab_create: "inactive", tab_blogs: "active"};
//
//            res.render('blogs', {title: "Blogs", tab_stats, blogs: result });
//        })
//        .catch((err) => {
//            console.log(err);
//        })
//});

//Taking post request to create blog from blog create page
//router.post('/blogs', (req,res) => {
//    //console.log(req.body) //Check the post data returned by req
//    const blog = new MyBlog(req.body);
//
//    blog.save()
//    .then((result) => {
//        res.redirect('/blogs');
//    })
//    .catch((err) => {
//        console.log(err);
//    })
//});

//Individual blogs view page
//router.get('/blogs/:id', (req,res) => {
//    const id = req.params.id
//    //console.log(id);
//    MyBlog.findById(id)
//        .then(result => {
//            const tab_stats ={tab_home: "inactive", tab_about: "inactive", tab_create: "inactive", tab_blogs: "inactive"};
//
//            res.render('blog_details', { blog: result, tab_stats, title: 'Blog Details'});
//        })
//        .catch(err =>{
//            console.log(err);
//        })
//});

//Delete
//router.delete('/blogs/:id', (req, res) => {
//    const id = req.params.id;
//
//    MyBlog.findByIdAndDelete(id)
//        .then( result => {
//            res.json({ redirect: '/blogs'})
//        })
//        .catch( err => {
//            console.log(err);
//        })
//})



module.exports = router;