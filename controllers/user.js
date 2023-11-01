import { getUser, registerNewUser } from "./modules/database.mjs";
import bcrypt from 'bcrypt';

export async function login(req, res){
    try {
        const { email, password } = req.body;
        const result = await getUser(email)

        if(!result.success){
            return res.status(404).json({success: false, message: "The user does not exist"})
        }
        if(!bcrypt.compareSync(password, result.user.hashedPassword)) {
            return res.status(404).json({success: false, message: "The password is invalid"})
        }
        req.session.user = { id: result.user.userId, email: result.user.email };
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
        const userFolder = path.join(__dirname,'ftp',userID)
        fs.promises.mkdir(userFolder)
        req.session.user = {id: userID, email: email}
        res.status(200).json({success: true})
    } catch (error) {
        console.error(error);
        // Enviar respuesta JSON indicando fallo
        res.status(401).json({ success: false });
    }
}