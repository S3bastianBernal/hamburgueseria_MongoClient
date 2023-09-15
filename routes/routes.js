const express = require('express');

const {MongoClient} = require ('mongodb');
require('dotenv').config();
const router = express.Router();

const client = new MongoClient(process.env.DATABASE_SEBASTIAN)
const db = client.db('Hamburgueseria');


/* Acceso a todas las colecciones de manera mas dinamica */
const chefsCollection = db.collection('chefs');
const ingredientesCollection = db.collection('ingredientes');
const hamburguesasCollection = db.collection('hamburguesas');
const categoriaCollection = db.collection('categorias');




/* Endpoint 1:Encontrar todos los ingredientes con stock menor a 400. */
router.get('/ejercicio1/', async(req, res) => {
    try {
        await client.connect();
        const result = await ingredientesCollection.find({ stock: {$lt: 400}}).toArray(); // $lt funciona para establecer un limite en un dato
        res.send(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 2:Encontrar todas las hamburguesas de la categoría “Vegetariana”*/
router.get('/ejercisio2/', async(req, res) => {
    try {
        await client.connect();
        const result = await hamburguesasCollection.find({ categoria: "Vegetariana"}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 3:Encontrar todos los chefs que se especializan en “Carnes” */
router.get('/ejercicio3/', async(req, res) => {
    try {
        await client.connect();
        const result = await chefsCollection.find({ especialidad: "Carnes"}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 4:Aumentar en 1.5 el precio de todos los ingredientes */
router.get('/ejercicio4/', async(req,res) =>{
    try {
        await client.connect();
        const update = {$mul: {precio: 1.5}} //$mul funciona para multiplicar un dato 
        const result = await ingredientesCollection.updateMany({},update);
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 5:Encontrar todas las hamburguesas preparadas por “ChefB” */
router.get('/ejercicio5/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.find({chef: "ChefB"}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});


/* Endpoint 6:Encontrar el nombre y la descripción de todas las categorías */

 router.get('/ejercicio6/', async(req,res) =>{
    try {
        await client.connect();
        const result = await categoriaCollection.find().toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 7: Eliminar todos los ingredientes que tengan un stock de 0 */

router.get('/ejercicio7/', async(req,res) =>{
    try {
        await client.connect();
        const filter = {stock: 0}
        const result = await ingredientesCollection.deleteMany(filter);
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 8:Agregar un nuevo ingrediente a la hamburguesa “Clásica” */

router.get('/ejercicio8/', async(req,res) =>{
    try {
        await client.connect();
        await hamburguesasCollection.updateOne({nombre: 'Clásica'}, {$push : {ingredientes: "chile"}}) //$push sirve para agregar un dato
        const result = await hamburguesasCollection.find({nombre: "Clásica"}).toArray();
        res.json(result);
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 9:Encontrar todas las hamburguesas que contienen “Pan integral” como ingrediente */

router.get('/ejercicio9/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.find({ingredientes: "Pan integral"}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 10: Cambiar la especialidad del “ChefC” a “Cocina Internacional” */

router.get('/ejercicio10/', async(req,res) =>{
    try {
        await client.connect();
        await chefsCollection.updateOne({nombre: "ChefC"}, {$set : {especialidad: "Cocina Internacional"}}) //$set nos ayuda a remplazar un dato por otro en especifico
        const result = await chefsCollection.find({especialidad: "Cocina Internacional"}).toArray();
        res.json(result);
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 11:Encontrar el ingrediente más caro */

router.get('/ejercicio11/', async(req,res) =>{
    try {
        await client.connect();
        const result = await ingredientesCollection.find().sort({precio: -1}).limit(1).toArray(); //sort en este caso nos ayuda a ordenar el contenido ya sea de menor a mayor (1) o de mayor a menor (-1), limit nos ayuda a tener un numero especifico de contenido en el array final
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 12:Encontrar las hamburguesas que NO contienen “Queso cheddar” como ingrediente */

router.get('/ejercicio12/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.find({ingredientes: {$ne : "Queso cheddar"}}).toArray(); // $ne sirve para decir al sistema que un dato no debe estar en nuestra consulta
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});


/* Endpoint 13: Incrementar el stock de “Pan” en 100 unidades */

router.get('/ejercicio13/', async(req,res) =>{
    try {
        await client.connect();
        await ingredientesCollection.updateOne({nombre: "Pan"}, {$inc : {stock: 100}})
        const result = await ingredientesCollection.find({nombre: "Pan"}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 14: Encontrar todos los ingredientes que tienen una descripción que contiene la palabra “clásico” */

router.get('/ejercicio14/', async(req,res) =>{
    try {
        await client.connect();
        const result = await ingredientesCollection.find({descripcion: {$regex: "clásico"}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        
    }
});

/* Endpoint 15: Listar las hamburguesas cuyo precio es menor o igual a $9 */

router.get('/ejercicio15/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.find({precio: {$lte: 9}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 16:Contar cuántos chefs hay en la base de datos */

router.get('/ejercicio16/', async(req,res) =>{
    try {
        await client.connect();
        const result = await chefsCollection.countDocuments();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 17:Encontrar todas las categorías que contienen la palabra “gourmet” en su descripción */

 router.get('/ejercicio17/', async(req,res) =>{
    try {
        await client.connect();
        const result = await categoriaCollection.find({descripcion: {$regex: "gourmet"}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 18:Eliminar las hamburguesas que contienen menos de 5 ingredientes */

router.get('/ejercicio18/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.deleteMany({$expr: { $lt: [{ $size: "$ingredientes"}, 5]}});
        if (result.deletedCount > 0) {
            res.json('Hamburguesas Eliminadas exitosamente')
        }else{
            res.json('No se han eliminado hamburguesas')
        }
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 19: Agregar un nuevo chef a la colección con una especialidad en “Cocina Asiática” */

router.get('/ejercicio19/', async(req,res) =>{
    try {
        await client.connect();
        await chefsCollection.insertOne({
            nombre: "ChefD",
            especialidad: "Cocina Asiática"
        })
        const result = await chefsCollection.find({nombre: "ChefD"}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 20: Listar las hamburguesas en orden ascendente según su precio */

router.get('/ejercicio20/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.find().sort({precio: 1}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 21: Encontrar todos los ingredientes cuyo precio sea entre $2 y $5*/

router.get('/ejercicio21/', async(req,res) =>{
    try {
        await client.connect();
        const result = await ingredientesCollection.find({precio: {$gte: 2, $lte: 5}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 22: Actualizar la descripción del “Pan” a “Pan fresco y crujiente”*/

router.get('/ejercicio22/', async(req,res) =>{
    try {
        await client.connect();
        await ingredientesCollection.updateOne({nombre: "Pan"}, {$set : {descripcion: "Pan fresco y crujiente"}})
        const result = await ingredientesCollection.find({descripcion: "Pan fresco y crujiente"}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 23: Encontrar todas las hamburguesas que contienen “Tomate” o “Lechuga” como ingredientes*/

router.get('/ejercicio23/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.find({ingredientes: {$in: ["Tomate", "Lechuga"]}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 24: Listar todos los chefs excepto “ChefA” */

router.get('/ejercicio24/', async(req,res) =>{
    try {
        await client.connect();
        const result = await chefsCollection.find({nombre: {$ne: "ChefA"}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 25: Incrementar en $2 el precio de todas las hamburguesas de la categoría “Gourmet” */

router.get('/ejercicio25/', async(req,res) =>{
    try {
        await client.connect();
        await hamburguesasCollection.updateMany({categoria: "Gourmet"}, {$inc: {precio: 2}})
        const result = await hamburguesasCollection.find({categoria: "Gourmet"}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 26: Listar todos los ingredientes en orden alfabético*/

router.get('/ejercicio26/', async(req,res) =>{
    try {
        await client.connect();
        const result = await ingredientesCollection.find().sort({nombre: 1}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
       console.log(error); 
    }
});

/* Endpoint 27: Encontrar la hamburguesa más cara */

router.get('/ejercicio27/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.find().sort({precio: -1}).limit(1).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 28: Agregar “Pepinillos” a todas las hamburguesas de la categoría “Clásica”*/

router.get('/ejercicio28/', async(req,res) =>{
    try {
        await client.connect();
        await hamburguesasCollection.updateMany({categoria: "Clásica"}, {$addToSet: {ingredientes: "Pepinillos"}})
        const result = await hamburguesasCollection.find({categoria: "Clásica"}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 29: Eliminar todos los chefs que tienen una especialidad en “Cocina Vegetariana” */

router.get('/ejercicio29/', async(req,res) =>{
    try {
        await client.connect();
        await chefsCollection.deleteMany({especialidad: "Cocina Vegetariana"})
        const result = await chefsCollection.find().toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 30: Encontrar todas las hamburguesas que contienen exactamente 7 ingredientes */

router.get('/ejercicio30/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.find({ingredientes: {$size: 7}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 31: Encontrar la hamburguesa más cara que fue preparada por un chef especializado en “Gourmet”*/

router.get('/ejercicio31/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.aggregate([
            { $match: { chef: 'ChefC', categoria: 'Gourmet' } },
            { $sort: { precio: -1 } },
            { $limit: 1 }
        ]).toArray();
        res.json(result[0]);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

/* Endpoint 32: Listar todos los ingredientes junto con el número de hamburguesas que los contienen */


router.get('/ejercicio32/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.aggregate([
            { $unwind: '$ingredientes' },
            { $group: { _id: '$ingredientes', count: { $sum: 1 } } }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error);
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 33: Listar los chefs junto con el número de hamburguesas que han preparado */


router.get('/ejercicio33/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.aggregate([{$group: {_id: "$chef", cantidad: {$sum: 1}}}]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error);
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 34: Encuentra la categoría con la mayor cantidad de hamburguesas */

router.get('/ejercicio34/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.aggregate([{$group: {_id: "$categoria", cantidad: {$sum: 1}}}]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
});

/* Endpoint 35: Listar todos los chefs y el costo total de ingredientes de todas las hamburguesas que han preparado */

router.get('/ejercicio35/', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesasCollection.aggregate([
            { $unwind: '$ingredientes' },
            { $lookup: { from: 'ingredientes', localField: 'ingredientes', foreignField: 'nombre', as: 'ingredientesData' } },
            {
                $group: {
                    _id: '$chef',
                    costoTotal: { $sum: { $sum: '$ingredientesData.precio' } }
                }
            }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

/* Endpoint 36: Encontrar todos los ingredientes que no están en ninguna hamburguesa */

router.get('/ejercicio36/', async (req, res) => {
    try {
        await client.connect();
        const hamburguesas = await db.collection('hamburguesas').distinct('ingredientes');
        const result = await db.collection('ingredientes').find({ nombre: { $nin: hamburguesas } }).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

/* Endpoint 37: Listar todas las hamburguesas con su descripción de categoría*/

router.get('/ejercicio37/', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesasCollection.aggregate([
            { $lookup: { from: 'categorias', localField: 'categoria', foreignField: 'nombre', as: 'categoriasData' } },
            {
                $project: {
                    _id: 0,
                    categoria: '$categoriasData.nombre',
                    descripcion: '$descripcion'
                }
            }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

/* Endpoint 38: Encuentra el chef que ha preparado hamburguesas con el mayor número de ingredientes en total*/

router.get('/ejercicio38/', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesasCollection.aggregate([
            { $unwind: '$ingredientes' },
            { $group: { _id: '$chef', ingredientesCount: { $sum: 1 } } },
            { $sort: { ingredientesCount: -1 } },
            { $limit: 1 }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

/* Endpoint 39: Encontrar el precio promedio de las hamburguesas en cada categoría*/

router.get('/ejercicio39/', async (req, res) => {
    try {
        await client.connect();
        const result = await hamburguesasCollection.aggregate([
            { $group: { _id: '$categoria', precio: { $avg: '$precio' } } }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

/* Endpoint 40: Listar los chefs y la hamburguesa más cara que han preparado */

router.get('/ejercicio40/', async (req, res) => {
    try {
        client.connect();
        const result = await db.collection('hamburguesas').aggregate([
            { $group: { _id: '$chef', hamburguesaCara: { $max: '$precio' } } },
            { $lookup: { from: 'chefs', localField: '_id', foreignField: 'nombre', as: 'chefData' } },
            { $project: { _id: 0, 'chefData.nombre': 1, hamburguesaCara: 1 } }
        ]).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;