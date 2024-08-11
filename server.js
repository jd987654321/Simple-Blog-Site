const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express();
const port = 5500;

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname))
app.use(express.json())


function getPageData(title){
  try{
    const data = fs.readFileSync(__dirname + `/blogs/${encodeURIComponent(title)}`, 'utf8')
    return data
  }catch(err){
    console.error('Error reading file: ', err)
    return null
  }
}

app.get('/page/:title', (req, res) => {
  res.render(__dirname + '/front_end/page.ejs', {title: req.params.title, text: getPageData(req.params.title)})
})

app.get('/', (req, res) => {
  fs.readdir('blogs', (err,files) => {
    if(err) throw err
    res.render(__dirname + '/front_end/index.ejs', {files: files})
  })
})

app.get('/new', (req, res) => {
  res.render(__dirname + "/front_end/edit_page.ejs", {title: "", text: ""})
})

app.get('/editPage/:title', (req, res) => {
  res.render(__dirname + "/front_end/edit_page.ejs", {title: req.params.title, text: getPageData(req.params.title)})
})

// app.get("/info", (req, res) => {
//   let jsonObj = JSON.stringify({text: "some info"})
//   res.send(jsonObj)
// })

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

app.delete('/:title', (req, res) => {
  console.log(__dirname + `/blogs/${req.params.title}`)
  fs.unlink(__dirname + `/blogs/${encodeURIComponent(req.params.title)}`, (err) => {
    if(err) throw err
    console.log('file was successfully deleted')
  })
  res.status(200)
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})



/**
 * to do list
 * 
 * -make each blog page deletable, add button and app.delete method
 * -make an edit page, and a ejs template for edit pages if need be, we might be able to get away with using new_page.html
 * 
 * the current problem is that edits wont be saved to the original file
 * due to conflicting title names
 * 
 * life cycle of a file
 * displayed    title stays 
 * index.ejs -> page.ejs     ->
 */
