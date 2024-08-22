import pool from '../DB/db.js'

const getProducts = async (req, res) => {
    try{
        console.log('Inside getProducts')
        const selectQuery = "select * from practice.products";
        const result = await pool.query(selectQuery)

        if(result!=null){
            return res.status(200).json(result.rows)
        }
        else{
            console.log("Couldn't get data")
            return res.status(400).json({err:"Data not found"})
        }
    }
    catch(err){
        console.log("Error retrieving data" + err?.message)
        return res.status(500).json({err:"Data not found"})
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;

        const selectQuery = `select * from practice.products where product_id = ${id}`;
        const result = await pool.query(selectQuery);
        if (res.statusCode === 200){
            if(result.rowCount === 1){
                return res.status(200).json(result.rows)
            }
            else{
                return res.status(404).json({ error: 'Id Not Found'})
            }
        }
        else {
            return res.status(400).json({error: 'Error Retrieving Data'})
        }
    }
    catch(err){
        console.log("Error retrieving data" + err?.message)
        return res.status(500).json({err:"Data not found"})
    }
}

const getProductByCategory = async (req, res) => {
    try {
        const category = req.query.category;
        const selectQuery = `select * from practice.products where category = ${category}`;
        const result = await
            pool.query(selectQuery);
        if (res.statusCode === 200) {
            if (result.rowCount >=1) {
                return res.status(200).json(result.rows)
            }
            else {
                return res.status(404).json({ error: 'Category Not Found' })
            }
        }
        else {
            return res.status(400).json({ error: 'Error Retrieving Data' })
        }
    }
    catch (error) {
        console.log("Error Caught " + error?.message)
        return res.status(500).json({ error: 'Internal Error' })
    }
}

const getProductByPriceRange = async(req, res) =>{
    try {
        const min = req.query.min;
        const max = req.query.max;
        const selectQuery = `select * from practice.products where price >= ${min} and price <= ${max}`;
        const result = await pool.query(selectQuery);
        if (res.statusCode === 200) {
            if (result.rowCount >= 1) {
                return res.status(200).json(result.rows)
            }
            else {
                return res.status(404).json({ error: 'No Products found for the given category' })
            }
        }
        else {
            return res.status(400).json({ error: 'Error Retrieving Data' })
        }
    }
    catch (error) {
        console.log("Error Caught " + error?.message)
        return res.status(500).json({ error: 'Internal Error' })
    }
}

const createNewProduct = async (req, res) => {
    try {
        const { product_name, price, category, star_rating, description, product_code, imageurl } = req.body;

        // Validate Input
        if (!product_name || !price || !category || !star_rating || !description || !product_code || !imageurl) {
            return res.status(400).json({ error: 'All Fields are required' });
        }

        const insertQuery = `INSERT into practice.products(product_name, price, category, star_rating, description, product_code, imageurl) values('${product_name}', ${price}, '${category}',  ${star_rating}, '${description}', '${product_code}', '${imageurl}') RETURNING*`;

        const result = await pool.query(insertQuery, [
            product_name,
            price,
            category,
            star_rating,
            description,
            product_code,
            imageurl
        ]);

        return res.status(201).send(result.rows[0], { message: 'Product Created Successfully' });
    } catch (error) {
        console.error("Error Caught: " + error.message);
        return res.status(500).json({ error: `Internal Server Error ${error.message}` });
    }
}

export {getProducts, getProductById, getProductByCategory, getProductByPriceRange, createNewProduct}