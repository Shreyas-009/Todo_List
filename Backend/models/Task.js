const mongoose = require('mongoose');
const taskschema = new mongoose.Schema({
    title:{
        type: 'string',
        required: true,
    },
    discreption: {
        type:'string',
        required: true,
    },
    date: {
        type: 'date',
        required: true,
    },
})

const Task = mongoose.model('Task',taskschema);
module.exports = Task;



