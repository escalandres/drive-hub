import {MongoClient} from 'mongodb';
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    const db = client.db('drive-hub');
    return db;
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err);
  }
}

async function disconnect() {
  try {
    await client.close();
    console.log('Disconnected from MongoDB Atlas');
  } catch (err) {
    console.error('Error disconnecting from MongoDB Atlas:', err);
  }
}

export async function getUser(email) {
  try {
    const client = await connect()
    const usersCollection = client.collection('users');
    const dbResult = await usersCollection.findOne({email: email});

    if (dbResult) {
      return {success: true, user: dbResult, error: "" };
    } else {
      return {success: false, user: {}, error: "Usuario no encontrado"}
    }
  } catch (error) {
    console.error('Error al buscar el usuario. ',error);
    return {success: false, user: {}, error: error}
  } finally {
    disconnect();
  }
}

export async function registerNewUser(user) {
  try {
    const client = await connect()
    const usersCollection = client.collection('users');

    // Crear índices únicos en email y userId
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await usersCollection.createIndex({ id: 1 }, { unique: true });

    const dbResult = await usersCollection.insertOne(user);
    if (dbResult.acknowledged) {
      return { success: true, result: "Usuario creado!", error: "" };
    } else {
      return { success: false, result: "", error: "No se pudo crear el usuario" }
    }
  } catch (error) {
    console.error('Ocurrio un error:', error);
    return {success: false, message: error};
  } finally {
    disconnect();
  }
}

export async function changePassword(email,password) {
  try {
    const client = await connect()
    const usersCollection = client.collection('users');
    const dbResult = await usersCollection.updateOne({email: email}, {$set: {password: password}});

    console.log(dbResult)
    if (dbResult.acknowledged) {
      return { success: true, result: "Articulo modificado!", error: "" };
    } else {
      return { success: false, result: "", error: "No se pudo modificar el articulo" }
    }
  } catch (error) {
    console.error('Ocurrio un error:', error);
    return { success: false, user: {}, error: error }
  } finally {
    disconnect();
  }
}
