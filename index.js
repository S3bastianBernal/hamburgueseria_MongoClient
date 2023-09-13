const express = require('express');
const {Router} = require('express');
const {MongoClient} = require('mongodb');

require('dotenv').config();

const app = express();
const router = Router();


const client = new MongoClient(process.env.DATABASE_SEBASTIAN)
const db = client.db('Hamburgueseria');

const port = process.env.PORT444;

/* Acceso a las rutas de manera mas dinamica */
const path = {
    ingredientesPath: '/api/ingredientes',
    hamburguesasPath: '/api/hamburguesas',
    chefsPath: '/api/chefs',
    categoriasPath: '/api/categorias'
}

/* Acceso a todas las colecciones de manera mas dinamica */
const chefsCollection = db.collection('chefs');
const ingredientesCollection = db.collection('ingredientes');
const hamburguesasCollection = db.collection('hamburguesas');
const categoriaCollection = db.collection('categorias');



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



app.use(express.json());

/* Endpoint 1:Encontrar todos los ingredientes con stock menor a 400. */
app.use(path.ingredientesPath, router.get('/ejercicio1/', async(req, res) => {
    try {
        await client.connect();
        const result = await ingredientesCollection.find({ stock: {$lt: 400}}).toArray();
        res.send(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));

/* Endpoint 2:Encontrar todas las hamburguesas de la categoría “Vegetariana”*/
app.use(path.hamburguesasPath, router.get('/ejercisio2/', async(req, res) => {
    try {
        await client.connect();
        const result = await hamburguesasCollection.find({ categoria: "Vegetariana"}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));

/* Endpoint 3:Encontrar todos los chefs que se especializan en “Carnes” */
app.use(path.chefsPath, router.get('/ejercicio3/', async(req, res) => {
    try {
        await client.connect();
        const result = await chefsCollection.find({ especialidad: "Carnes"}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));

/* Endpoint 4:Aumentar en 1.5 el precio de todos los ingredientes */
app.use(path.ingredientesPath, router.get('/ejercicio4/', async(req,res) =>{
    try {
        await client.connect();
        const update = {$mul: {precio: 1.5}}
        const result = await ingredientesCollection.updateMany({},update);
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));

/* Endpoint 5:Encontrar todas las hamburguesas preparadas por “ChefB” */
app.use(path.hamburguesasPath, router.get('/ejercicio5/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.find({chef: "ChefB"}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));


/* Endpoint 6:Encontrar el nombre y la descripción de todas las categorías */

app.use(path.categoriasPath, router.get('/ejercicio6/', async(req,res) =>{
    try {
        await client.connect();
        const result = await categoriaCollection.find().toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));

/* Endpoint 7: Eliminar todos los ingredientes que tengan un stock de 0 */

app.use(path.ingredientesPath, router.get('/ejercicio7/', async(req,res) =>{
    try {
        await client.connect();
        const filter = {stock: 0}
        const result = await ingredientesCollection.deleteMany(filter);
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));

/* Endpoint 8:Agregar un nuevo ingrediente a la hamburguesa “Clásica” */

app.use(path.hamburguesasPath, router.get('/ejercicio8/', async(req,res) =>{
    try {
        await client.connect();
        await hamburguesasCollection.updateOne({nombre: 'Clásica'}, {$push : {ingredientes: "chile"}})
        const result = await hamburguesasCollection.find({nombre: "Clásica"}).toArray();
        res.json(result);
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));

/* Endpoint 9:Encontrar todas las hamburguesas que contienen “Pan integral” como ingrediente */

app.use(path.hamburguesasPath, router.get('/ejercicio9/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.find({ingredientes: "Pan integral"}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));

/* Endpoint 10: Cambiar la especialidad del “ChefC” a “Cocina Internacional” */

app.use(path.chefsPath, router.get('/ejercicio10/', async(req,res) =>{
    try {
        await client.connect();
        await chefsCollection.updateOne({nombre: "ChefC"}, {$set : {especialidad: "Cocina Internacional"}})
        const result = await chefsCollection.find({especialidad: "Cocina Internacional"}).toArray();
        res.json(result);
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));

/* Endpoint 11:Encontrar el ingrediente más caro */

app.use(path.ingredientesPath, router.get('/ejercicio11/', async(req,res) =>{
    try {
        await client.connect();
        const result = await ingredientesCollection.find().sort({precio: -1}).limit(1).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));

/* Endpoint 12:Encontrar las hamburguesas que NO contienen “Queso cheddar” como ingrediente */

app.use(path.hamburguesasPath, router.get('/ejercicio12/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.find({ingredientes: {$ne : "Queso cheddar"}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));


/* Endpoint 13: Incrementar el stock de “Pan” en 100 unidades */

app.use(path.ingredientesPath, router.get('/ejercicio13/', async(req,res) =>{
    try {
        await client.connect();
        await ingredientesCollection.updateOne({nombre: "Pan"}, {$inc : {stock: 100}})
        const result = await ingredientesCollection.find({nombre: "Pan"}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));

/* Endpoint 14: Encontrar todos los ingredientes que tienen una descripción que contiene la palabra “clásico” */

app.use(path.ingredientesPath, router.get('/ejercicio14/', async(req,res) =>{
    try {
        await client.connect();
        const result = await ingredientesCollection.find({descripcion: {$regex: "clásico"}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        
    }
}));

/* Endpoint 15: Listar las hamburguesas cuyo precio es menor o igual a $9 */

app.use(path.hamburguesasPath, router.get('/ejercicio15/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.find({precio: {$lte: 9}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));

/* Endpoint 16:Contar cuántos chefs hay en la base de datos */

app.use(path.chefsPath, router.get('/ejercicio16/', async(req,res) =>{
    try {
        await client.connect();
        const result = await chefsCollection.countDocuments();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));

/* Endpoint 17:Encontrar todas las categorías que contienen la palabra “gourmet” en su descripción */

app.use(path.categoriasPath, router.get('/ejercicio17/', async(req,res) =>{
    try {
        await client.connect();
        const result = await categoriaCollection.find({descripcion: {$regex: "gourmet"}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));

/* Endpoint 18:Eliminar las hamburguesas que contienen menos de 5 ingredientes */

app.use(path.hamburguesasPath, router.get('/ejercicio18/', async(req,res) =>{
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
}));

/* Endpoint 19: Agregar un nuevo chef a la colección con una especialidad en “Cocina Asiática” */

app.use(path.chefsPath, router.get('/ejercicio19/', async(req,res) =>{
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
}));

/* Endpoint 20: Listar las hamburguesas en orden ascendente según su precio */

app.use(path.hamburguesasPath, router.get('/ejercicio20/', async(req,res) =>{
    try {
        await client.connect();
        const result = await hamburguesasCollection.find().sort({precio: 1}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));

/* Endpoint 21: Encontrar todos los ingredientes cuyo precio sea entre $2 y $5*/

app.use(path.ingredientesPath, router.get('/ejercicio21/', async(req,res) =>{
    try {
        await client.connect();
        const result = await ingredientesCollection.find({precio: {$gte: 2, $lte: 5}}).toArray();
        res.json(result);
        client.close();
    } catch (error) {
        res.status(404).json("no funca joven");
    }
}));