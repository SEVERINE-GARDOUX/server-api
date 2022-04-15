//firebase
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

//initialisation firebase
const serviceAccount = require('./fire.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

/**
 * il prend un object DVD comme parametre, pour ajouter a la base de donnée
 * @param dvd - l objet a ajouter à la base de données
 */
async function setData (dvd) {
const res = await db.collection('DVDtheque').add(dvd)
}

async function getData () {  //récuperer les données des articles
const refDvd = db.collection('DVDtheque');
const snapshot = await refDvd.get();
const data = []
snapshot.forEach(doc => {
    const dvd = {
        id:doc.id,
        content:doc.data()
        }
        data.push(dvd)
});
return data
}

async function update (id, content) {
    const DvdRef = db.collection('DVDtheque').doc(id);
    const res = await DvdRef.update({content});
}

async function deleteData (id) { //Suppression de données
    const res = await db.collection('DVDtheque').doc(id).delete();
}

module.exports = {setData, getData, deleteData, update}