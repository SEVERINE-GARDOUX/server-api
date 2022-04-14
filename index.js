//server
const express = require('express')
const bodyParser = require('body-parser')
const {getData, setData, deleteData, updateData} = require ('./libfirebase')

const app = express()
const port = 3000

app.use(bodyParser.json({type:'*/*'}))

// const newDvd = {
//     titre: "Road house",
//     url : "http://..."
// }
// setData (newDvd)

/* Le serveur reçoit une req(requete) get. On prend le getdata et on envoi la reponse en json */
app.get('/', async(req, res) => {
    const response = await getData() //response = res
  res.json(response)
})

/* Envoi des données */
app.post('/', (req, res) => {
    setData(req.body)
    res.send(req.body)
})

app.put('/:id', (req, res) => { //mise a jour de l'article
    updateData(req.params.id, req.body)
    res.send(req.body)
})

app.delete('/:id', (req, res) => { //suppression de l'article par son id
    deleteData(req.params.id)
    res.send('ok')
})

/* On ecoute le port 3000*/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})