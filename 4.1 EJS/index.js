import express from 'express';

const app = express();
const port = 3000;

const today=new Date();
let seconds=today.getSeconds();
let fruits=['apple','banana','cherry']
app.get('/', (req, res) => {
    res.render('index.ejs',{title:'EJS Tags',second:seconds,list:fruits,emText:'<em>This is some em text</em>'})
})
app.listen(port, () => {
    console.log('hello there')
});