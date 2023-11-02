import { getUser, registerNewUser } from "./modules/database.mjs";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
// Set up storage for uploaded files

const currentFileURL = import.meta.url;
// Convierte la URL del archivo en una ruta de sistema de archivos
const currentFilePath = fileURLToPath(currentFileURL);
// Obtiene el directorio del archivo actual
const __dirname = dirname(currentFilePath);

export async function login(req, res){
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const result = await getUser(email)
        console.log(result)
        if(!result.success){
            return res.status(404).json({success: false, message: "The user does not exist"})
        }
        if(!bcrypt.compareSync(password, result.user.password)) {
            return res.status(404).json({success: false, message: "The password is invalid"})
        }
        console.log('si es')
        req.session.user = { id: result.user.id, email: result.user.email };
        console.log('si hay sesion')
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        // Enviar respuesta JSON indicando fallo
        res.status(401).json({ success: false });
    }
}

export async function signup(req,res){
    try {
        const { email, password, name } = req.body;
        const userID = crypto.randomBytes(16).toString('hex');
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(email, password, name, userID);
        const response = await registerNewUser({id: userID, email: email, name: name, password: hashedPassword})
        console.log('response',response)
        if(!response.success){
            return res.status(401).json({success: false, message: "Error al crear su cuenta de usuario. Inténtelo nuevamente"})
        }
        console.log(path.join(__dirname, '../', 'drive',userID))
        const userFolder = path.join(__dirname, '../', 'drive',userID)
        console.log('userFolder',userFolder)
        fs.promises.mkdir(userFolder)
        req.session.user = {id: userID, email: email}
        console.log(req.session.user)
        res.status(200).json({success: true})
    } catch (error) {
        console.error(error);
        // Enviar respuesta JSON indicando fallo
        res.status(401).json({ success: false });
    }
}

export async function logout(req,res){
    // Destruir la sesión y redirigir a la página de inicio de sesión
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al destruir la sesión:', err);
            return res.status(500).json({success: false, message: "Ha ocurrido un error con su petición. Inténtelo nuevamente"})
        }
        return res.status(200).json({success: true})
    });
}