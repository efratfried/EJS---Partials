import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
let posts = [];

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs', { posts: posts });
});

app.get('/new-post', (req, res) => {
    res.render('new-post.ejs');
});

app.post('/new-post', (req, res) => {
    const postExist = req.body;
    if (posts.find(post => post.title === postExist.title && post.content == postExist.content)) {
        return;
    }
    else {
        const post = {
            id: posts.length === 0 ? 1 : posts.length++,
            title: req.body.title,
            content: req.body.content,
            type: 'add'
        };
        posts.push(post);
    }
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts.find(post => post.id === parseInt(postId));
    post['type'] = 'edit'
    if (!post) {
        res.status(404).send('Post not found');
        return;
    }
    res.render('new-post.ejs', { recipe: post });
});


app.listen(port, () => {
    console.log('hello there');
})
