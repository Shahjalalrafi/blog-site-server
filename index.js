const express = require('express')
const app = express()
const Posts = require('./api/model/posts')
const postData = new Posts()


app.get('/', (req, res) => {
    
    res.status(200).send(postData.get())
})

app.get('/api/posts', (req, res) => {
    res.status(200).send(postData.get())
})

app.get('/api/posts/:post_id', (req, res) => {
    const postId = req.params.post_id
    const foundPost = postData.getIndividualBlog(postId)
    if(foundPost) {
        res.status(200).send(foundPost)
    }else {
        res.status(400).send('not found')
    }
})

app.listen(5050, () => console.log('listenning from port 3000...'))