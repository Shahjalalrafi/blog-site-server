const express = require('express')
const app = express()
const Posts = require('./api/model/posts')
const postData = new Posts()
const multer =require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
})

const getExt = (mimeType) => {
    switch(mimeType) {
        case "image/png":
            return '.png';

        case "image/jpg":
            return ".jpg";

        case "image/jpeg":
            return '.jpeg'
    }
}

var upload = multer({ storage: storage })



app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
})

app.use('/uploads', express.static('uploads'))


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

app.post('/api/posts', upload.single('post-image'), (req, res) => {
    console.log(req.body)
    console.log(req.file.path)
    const filePath = req.file.path
    const replaceFile = filePath.replace('\\', '/')
    const newPost = {
        "id": `${Date.now()}`,
        "title" : req.body.title,
        "content" : req.body.content,
        "added-date": `${Date.now()}`,
        "post_image" : replaceFile
    }
    postData.add(newPost)

    res.status(201).send('ok')
})

app.listen(5050, () => console.log('listenning from port 5050...'))