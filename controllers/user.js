import 

export async function login(req, res){
    try {
        const email = req.body.email;
        const password = req.body.password;
        const result = await db.getUserByEmail(email)

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