const MyBlog = require('../models/blog_model');

//Homepage
const blog_index = (req, res) => {
    //sample way of passing the static data into template
    const blogs =[
        {title:'Static First Blog', snippet: 'Ultrices id ridiculus morbi donec ex penatibus natoque ad.' },
        {title:'Static Second Blog', snippet: 'Platea potenti posuere tristique mollis laoreet mauris porttitor fermentum dignissim est dui.' },
        {title:'Static Third Blog', snippet: 'Quis hac commodo fames dictum primis.' }
    ];
    const tab_stats ={tab_home: "active", tab_about: "inactive", tab_create: "inactive", tab_blogs: "inactive"};

    res.render('index', {title: "Home", tab_stats, blogs});   
}

//about page
const blog_about = (req, res) => {
    const tab_stats ={tab_home: "inactive", tab_about: "active", tab_create: "inactive", tab_blogs: "inactive"};

    res.render('about', {title: "About", tab_stats});  
}

//Blog creation page
const blog_create = (req, res) => {
    const tab_stats ={tab_home: "inactive", tab_about: "inactive", tab_create: "active", tab_blogs: "inactive"};    

    res.render('create', {title: "Create Blog", tab_stats});  
}

//Blog creation post request
const blog_create_post = (req, res) => {
        //console.log(req.body) //Check the post data returned by req
        const blog = new MyBlog(req.body);

        blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
}

//All blogs page
const blog_all = (req, res) => {
    MyBlog.find().sort({createdAt: -1})
    .then((result) => {
        const tab_stats ={tab_home: "inactive", tab_about: "inactive", tab_create: "inactive", tab_blogs: "active"};

        res.render('blogs', {title: "Blogs", tab_stats, blogs: result });
    })
    .catch((err) => {
        console.log(err);
    })
}

//Blog detail view page
const blog_detailview = (req, res) => {
    const id = req.params.id
    
    MyBlog.findById(id)
        .then(result => {
            const tab_stats ={tab_home: "inactive", tab_about: "inactive", tab_create: "inactive", tab_blogs: "inactive"};

            res.render('blog_details', { blog: result, tab_stats, title: 'Blog Details'});
        })
        .catch(err =>{
            const tab_stats ={tab_home: "inactive", tab_about: "inactive", tab_create: "inactive", tab_blogs: "inactive"};
            res.status(404).render('404', {title: '404 Error', tab_stats});
        })
}

//Blog detail view delete
const blog_detailview_delete = (req, res) => {
    const id = req.params.id;

    MyBlog.findByIdAndDelete(id)
        .then( result => {
            res.json({ redirect: '/blogs'})
        })
        .catch( err => {
            console.log(err);
        })
} 


module.exports = {
    blog_index,
    blog_about,
    blog_create,
    blog_create_post,
    blog_all,
    blog_detailview,
    blog_detailview_delete,
}