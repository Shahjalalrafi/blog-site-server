const Path = './data.json'
const fs = require('fs')

class Posts {
    get() {
        return this.readData()
    }

    getIndividualBlog(postId) {
        const posts = this.readData()
        const foundData = posts.find((post) => post.id == postId)
        return foundData
    }

    add(newPost) {
        const currentPost = this.readData()
        currentPost.unshift(newPost)
        this.storeData(currentPost)
    }

    readData() {
        const rawData = fs.readFileSync(Path)
        const data = JSON.parse(rawData)
        return data
    }

    storeData(rawData) {
        let data = JSON.stringify(rawData)
        fs.writeFileSync(Path, data)
    }
}

module.exports = Posts