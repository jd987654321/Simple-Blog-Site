const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express();
const port = 5500;

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname))
app.use(express.json())

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/front_end/index.html')
// })

app.get('/page/:title', (req, res) => {
  let title = encodeURIComponent(req.params.title)

  fs.readFile(`blogs/${title}`, (err, data) => {
    if(err) throw err
    res.render(__dirname + '/front_end/page.ejs', {title: req.params.title, text: data})
  })
})

app.get('/', (req, res) => {
  fs.readdir('blogs', (err,files) => {
    if(err) throw err
    res.render(__dirname + '/front_end/index.ejs', {files: files})
  })
})

app.get('/new', (req, res) => {
  res.sendFile(__dirname + "/front_end/new_page.html")
})

app.get("/info", (req, res) => {
  let jsonObj = JSON.stringify({text: "some info"})
  console.log(jsonObj)
  res.send(jsonObj)
})

app.get("/test/:name/:extra", (req, res) => {
  console.log(req.params.name + ' ' + req.params.extra)
  res.send("heehee")
})

app.post("/info", (req, res) => {
  console.log(req.body.text)
})

app.post('/savePage', (req, res) => {
  let title = req.body.title
  let newTitle = title.trim().replace(/ /g, '_')

  fs.writeFile(`blogs/${newTitle}.txt`, req.body.text, (err) =>{
    if(err) throw err
    console.log('blog saved')
  })
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

//simple blog application
/**
 * front end portion, extremely barebones html
 * We will have one page that lists all of the current blog pages
 * 
 * Each section for each blog will be clickable and lead us to a page where
 *  we can edit and save changes to the blog
 * 
 * We will also have a button to create new blog, which leads us to either the 
 *  same page for editing blogs, or a specific creation page
 * 
 * 
 * backend portion, so we want a txt file to store each blog file
 *  we need a function that returns all list of available txt files in a folder
 *  we also need a function to help provide the html for each page since i think
 *  we are doing server side rendering 
 */

/**
 * -> ejs template for displaying all the blogs
 * -> html page for writing new blog
 * -> ejs template for rendering the content on the txt file
 * 
 * the problem is that i will make whateer the user types, the title
 * so to solve this, 
 * 
 */
