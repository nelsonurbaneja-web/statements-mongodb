// use NameDataBase ( Esto me crea una base de datos, o me dice que use esa base de datos )

// show dbs ( Me lista los bases de datos que existen)

// Creo mi usuario
db.createUser({
  user: 'Nelson',
  pwd: '27346807',
  roles: ['readWrite', 'dbAdmin']
})

// Inserto un dato
db.clientes.insert(
  {
    firstName: 'Neymar Jr',
    lastName: 'Santos',
    nacionality: 'Brazil'
  }
)

// Inserto multiples datos
db.clientes.insert(
  [
    {
      firstName: 'Neymar Jr',
      lastName: 'Santos',
      nacionality: 'Brazil'
    },
    {
      firstName: 'leonel',
      lastName: 'messi',
      nacionality: 'Argentina'
    },
    {
      firstName: 'Cristiano',
      lastName: 'Ronaldo',
      nacionality: 'Portugal'
    },
  ]
)


// Buscar todos los registros
db.clientes.find();

// Buscar un registro por propiedad
db.clientes.find({
  nacionality: 'Portugal'
})


// Buscar un registro por Id (ObjectId)
db.clientes.find({
  _id : ObjectId("6043b4b26c773ab8fc2b2281"),
})

// Buscar un registro por varios querys
db.clientes.find({
  $or: [ { firstName: 'Neymar Jr Santos' }, {firstName: 'leonel',}] // Buscame a las personas que se llamen  Neymar ó leonel
})

// Buscar un registro por expresiones regulares
db.clientes.find({
  firstName: {$regex: 'ar' } // Me filtrar los nombre que contengan 'ar'
})


// Buscar un registro por una propiedad mayor menor o igual a algo
db.clientes.find(
  {age: {$gt: 18} } // Me busca los usuario mayores a 18. el $gt significa grater than (mayor que)
)

db.clientes.find(
  {age: {$lt: 18} } // Me busca los usuario menores a 18. el $lt significa less than (menor que)
)

db.clientes.find(
  {age: {$gt: 18, $lt: 50} } // Me busca los usuario mayores a 18 pero menores que 50
)

// Actualizar datos
db.clientes.update(
  { _id : ObjectId("6043b4b26c773ab8fc2b2281") }, // Busco al usuario por su id
  {                                               // Le paso todos sus datos ya modificados
    firstName: 'Neymar Jr Santos',
    lastName: 'Da Silva',
    nacionality: 'Brazil',
    club: 'PSG'                                   // Le puedo pasar tambien una nueva propiedad
  }
)

// Agregar una nueva propiedad sin tener que pasar todos los datos.
db.clientes.update(
  { _id : ObjectId("6043b4b26c773ab8fc2b2281") },
  {
    $set: {age: 29} // Con este set vendria siendo un patch
  }
)

// Eliminar una propiedad
db.clientes.update(
  { _id : ObjectId("6043b4b26c773ab8fc2b2281") },
  {
    $unset: {age: 1}  // el age: 1 es como decir que es verdadero
  }
)

// Incrementar datos numericos
db.clientes.update(
  { _id : ObjectId("6043b4b26c773ab8fc2b2281") },
  {                 
    $inc: {age: 1} // Le sumo 1 al campo age
  }
)

// Restar datos numericos
db.clientes.update(
  { _id : ObjectId("6043b4b26c773ab8fc2b2281") },
  {                 
    $inc: {age: -1} // Le resto 1 al campo age
  }
)

// Actualziar un dato de un (usuario) que no se existe pero igual me lo creo.
db.clientes.update(
  {firstName: 'Embappe'},
  {
    firstName: 'Embappe',
    lastName: 'xxxxxx',
    nacionality: 'Francia',
    club: 'PSG' 
  },
  {upsert: true} // esto dice que si no existe el dato, creamelo.
)

// Actualizar una propiedad
db.clientes.update(
  { _id : ObjectId("6043b4b26c773ab8fc2b2281") },
  {                 
    $rename: {'age' : 'edad'}  // a la propiedad age le digo que ahora se llamra edad
  }
)

// Eliminar registro (usuarios, productos, etc)
db.clientes.remove(
  { _id : ObjectId("604518baaa66dfb45af516ab") }
)


// Eliminar solo 1 registro en caso de que la consulta coincida con varios
db.clientes.remove(
  { firstName : 'carlos' }, // Si encuentra mas de un carlos me elimina el primero que encuentre
  { justOne: true}
)

// Ordenar registros
db.clientes.find().sort(
  {lastName: 1} // Me lo ordenas de la 'a' a la 'z'
)

db.clientes.find().sort(
  {lastName: -1} // Me lo ordenas de la 'z' a la 'a'
)

// Contar registros
db.clientes.find().count()

// Concatenar metodos
db.clientes.find({age: {$gt: 18}}).count() // Cuantame los registros cuya edad sea mayor a 18

// Limitar la busqueda
db.clientes.find().limit(3) // Me trae solo 3 registros 
db.clientes.find().limit(3).sort({firstName: 1})  // Me trae solo 3 registros y me los ordena por nombre de la A a la Z

// Recorrer con metodos de JavaScript

db.clientes.find().map(client => {
  print('client', client.firstName)
})