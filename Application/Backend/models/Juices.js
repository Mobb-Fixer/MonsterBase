const mongoose = require('mongoose');

const juicesSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    nombre: { type: Number, required: true },
    images: { type: String, required: true}
});

module.exports = mongoose.model('Juices', juicesSchema);