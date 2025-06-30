const express = require('express');
const fs = require('fs');
const users= require('./MOCK_DATA.json');
console.log( users);

const app= express();
const PORT= 3000;

app.use(express.urlencoded({extended: true}));

app.get ("/api/users", (req, res) => {
    res.json(users);    
});
app.get('/api/users/:id', (req,res) => {
    const id = Number (req.params.id);
    const user = users.find(user => user.id === id); 
    return res.json(user);
});

app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({status: "success", id: users.length+1}); 
    });
});
app.patch('/api/users/:id', (req,res) => {
    return res.json({status: "pending"});
});
app.delete('/api/users/:id', (req, res) =>  {
    return res.json({status: "pending"});
});



// app.get('/users', (req, res) => {
//     const html=`
//     <ul>
//         ${users.map(user => `<li>${user.first_name}</li>`).join('')}
//     </ul>
//     `;
//     res.send(html);
// });

app.listen(PORT, ()=>{
    console.log('server is running on port:',PORT);
});