// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());



server.get('/', (req,res) => {
  res.send('we are working');
});


///post 
server.post('/api/users', (req,res) => {
  console.log(req.body);
  const userInfo = req.body;
  if(!userInfo.name || !userInfo.bio) {
    res.status(400).json({errorMessage:'Please provide name and bio for the user.'})
  }else {
    db.insert(userInfo)
     .then(user => {
       res.status(201).json(user);
     })
       .catch(err => {
         console.log(err);
         res.status(500).json({error:'There was an error while saving the user'});
       }) 
  }
})
///get
server.get('/api/users', (req,res) => {
db.find()
.then(users => {
res.send(users)
})
.catch(err => {
  console.log(err);
  res.status(500).json({error: 'The user information could not be retrieved.'})
})
})
///get
server.get('/api/users/:id', (req,res) => {
const id = req.params.id;
db.findById(id)
.then(user => {
  console.log('user', user);
  res.send(user)
  if(!user) {
    res.status(404).json({error: 'The user with the specific ID does not exist.'})
  }
})
.catch(err => {
  console.log(err);
  res.status(500).json({error: 'The user information could not be retrieved.'})
})
})
///delete
server.delete('/api/users/:id' , (req, res) => {
const id = req.params.id;
db.remove(id)
.then(() => {
  res.status(201).json({success: `The user with the specific ID ${id} was deleted`})
})
.catch(err => {
  console.log(err);
  res.status(500).json({error: 'The user could not be removed'})
})
})
/* 
db.remove(id)
   .then(count => {
     res.status(200).json({ message: hubs with id ${id} deleted });
   })
   .catch(err => {
     console.log('error', err);
     res.status(500).json({ error: 'failed to delete the hub from the db' });
   });
*/
///put
server.put('/api/users/:id', (req,res) => {
const id = req.params.id;
const updates = req.body;
db.findById(id).then(user => {
  if (!user) {
    res.status(404).json({error: 'The user with the specific ID does not exist.'})
  }else if (!updates.name || !updates.bio){
    res.status(400).json({error: 'Please provide name and bio for the user.'})
  }else {
    db.update(id, updates)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({error: 'The user information could not be modified.'})
    })
    }
  })
})

const port = 9000;

server.listen(port, () => console.log(`API on port ${port}`))


