import bcrypt from "bcrypt";
import pool from "../DB/db.js";

const registerUser = async (req,res) => {
    try{
        const { user_name,user_password,email } = req.body;

        if (!user_name || !user_password || !email){
            return res.status(400).json({error: 'All fields are required'})
        }

        const saltRounds = 8;
        const hash = bcrypt.hashSync(user_password,saltRounds)

        const query = `Insert into practice.users(name, password,email) values ($1,$2,$3) RETURNING*`
        const values = [user_name,hash,email]

        const result  = await pool.query(query,values);
        return res.status(201).json(result.rows[0])
    }
    catch(error){
        console.log("Error Caught " + error?.message)
        return res.status(500).json({error: `Internal Error ${error.message}`})
    }
}

const loginUser = async (req, res) => {
    try {
        const { name, password } = req.body;

        const selectQuery = `select name, password from practice.users where name = $1`;
        const values = [name]
        const result = await pool.query(selectQuery,values);
        console.log(result)
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid Credentials : User Not Found' })
        }
        else { //Compare provided password with hashed password

            const user = result.rows[0]
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid Credentials : Password Did Not Match' })
            }
            else {
                return res.status(200).json({ message: 'Password match'})
            }
        }
    }
    catch (error) {
        console.log("Error Caught" + error?.message)
        return res.status(500).json({ error: `Internal Error ${error.message}` })
    }
}

export {registerUser, loginUser}