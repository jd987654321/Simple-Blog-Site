const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express();
const port = 5500;
const files = 'txt_files'
const templates = 'templates'

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname))
app.use(express.json())


function getPageData(title){
  try{
    const data = fs.readFileSync(__dirname + '/' + files + `/${encodeURIComponent(title)}`, 'utf8')
    return data
  }catch(err){
    console.error('Error reading file: ', err)
    return null
  }
}

app.get('/page/:title', (req, res) => {
  res.render(__dirname + '/' + templates + '/page.ejs', {title: req.params.title, text: getPageData(req.params.title)})
})

app.get('/', (req, res) => {
  fs.readdir(files, (err,files) => {
    if(err) throw err
    res.render(__dirname + '/' + templates + '/index.ejs', {files: files})
  })
})

app.get('/new', (req, res) => {
  res.render(__dirname + '/' + templates + '/edit_page.ejs', {title: "", text: ""})
})

app.get('/editPage/:title', (req, res) => {
  res.render(__dirname + '/' + templates + '/edit_page.ejs', {title: req.params.title, text: getPageData(req.params.title)})
})

app.post("/info", (req, res) => {
  console.log(req.body.text)
})

app.post('/savePage', (req, res) => {
  let title = req.body.title
  let newTitle = title.trim().replace(/ /g, '_')

  fs.writeFile(files + `/${newTitle}.txt`, req.body.text, (err) =>{
    if(err) throw err
    console.log('blog saved')
  })
})

app.delete('/:title', (req, res) => {
  console.log(__dirname + '/' + files + `/${req.params.title}`)
  fs.unlink(__dirname + '/' + files + `/${encodeURIComponent(req.params.title)}`, (err) => {
    if(err) throw err
    console.log('file was successfully deleted')
  })
  res.status(200)
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})


