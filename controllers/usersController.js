import bcrypt from "bcrypt";
import pool from "../DB/db.js";
import jwt from "jsonwebtoken";
import {config } from "dotenv";

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
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const query = `SELECT * FROM practice.users WHERE email = '${email}'`;
  
      const result = await pool.query(query);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const user = result.rows[0];
  
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Invalid credentials" });
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          SECRET,
          {
            expiresIn: "2m",
          }
        );
        return res.json({
          message: "Login successful",
          token: token,
        });
      }
    } catch (error) {
      console.error("Error Caught: " + error.message);
      return res
        .status(500)
        .json({ error: `Internal Server Error ${error.message}` });
    }
  }

const getUsers = async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM practice.users';
        const result = await pool.query(selectQuery);
        res.status(200).json(result.rows);
    } catch (error) {
        console.log('Error retrieving users:', error.message);
        res.status(500).json({ error: 'Internal Error' });
    }
};

//Get User by id

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const selectQuery = `SELECT * FROM practice.users WHERE id = ${id}`;
        const result = await pool.query(selectQuery);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.log('Error retrieving user:', error.message);
        res.status(500).json({ error: 'Internal Error' });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, phonenumber } = req.body;
        const updateQuery = `UPDATE practice.users SET name = $1, email = $2, password = $3, phonenumber = $4 WHERE id = ${id}`;
        const values = [name, email, password, phonenumber];
        const result = await pool.query(updateQuery, values);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log('Error updating user:', error.message);
        res.status(500).json({ error: 'Internal Error' });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteQuery = `DELETE FROM practice.users WHERE id = ${id}`;
        const result = await pool.query(deleteQuery);
        res.status(204).json({ message: 'User deleted' });
    } catch (error) {
        console.log('Error deleting user:', error.message);
        res.status(500).json({ error: 'Internal Error' });
    }
};

export {registerUser, loginUser, getUserById, getUsers, deleteUser, updateUser}