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

const getProductsByPriceRange = async (req, res) => {
    try {
      const min = req.query.min;
      const max = req.query.max;
      const selectQuery = `select * from practice.products where price between ${min} and ${max}`;
      const result = await pool.query(selectQuery);
      if (result.rowCount > 0) {
        return res.status(200).json(result.rows);
      } else {
        return res.status(404).json({ error: "No products found" });
      }
    } catch (error) {
      console.log("Error Caught " + error?.message);
      return res.status(500).json({ error: "Internal Error" });
    }
  };

  const createNewProduct = async (req, res) => {
    try {
        const newProduct = req.body;

        // Validate Input
        if (!newProduct.product_name || !newProduct.price || !newProduct.category || !newProduct.star_rating || !newProduct.description || !newProduct.product_code || !newProduct.imageurl) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Use parameterized query
        const insertQuery = `
            INSERT INTO practice.products (product_name, price, category, star_rating, description, product_code, imageurl)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [
            newProduct.product_name,
            newProduct.price,
            newProduct.category,
            newProduct.star_rating,
            newProduct.description,
            newProduct.product_code,
            newProduct.imageurl
        ];

        const result = await pool.query(insertQuery, values);

        return res.status(201).send({ message: 'Product Created Successfully' });
    } catch (error) {
        console.error("Error Caught: " + error.message);
        return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
}

const updateProductStarRating = async (req, res) => {
    try {
        const id = req.params.id;
        const { price, star_rating } = req.body;

        const updateQuery = `UPDATE practice.products SET price = $1 ,star_rating = $2 WHERE product_id = ${id} ;`
        const values = [price, star_rating]
        const result = await pool.query(updateQuery, values);

        // Validate Input
        if (!price && !star_rating) {
            return res.status(400).json({ error: 'Product not found' });
        }
        else {
            return res.status(200).send("Product Updated Successfully");
        }
    } catch (error) {
        console.error("Error Caught: " + error.message);
        return res.status(500).json({ error: `Internal Server Error ${error.message}` });
    }
}

const deleteProductById = async (req,res) => {
    try {
        const id = req.params.id;
        const deleteQuery = `DELETE FROM practice.products WHERE product_id=${id}`;
        const result = await pool.query(deleteQuery);
        if(result.rowCount === 1){
            return res.status(200).json({message: 'Product deleted successfully'});
        }
        else{
            return res.status(404).json({error: 'Product not found'});
        }
    } catch (error) {
        console.log(error.message);
    }
}

export {getProducts, getProductById, getProductByCategory, getProductsByPriceRange, createNewProduct, updateProductStarRating, deleteProductById}