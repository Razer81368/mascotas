const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/verProductos', async (req,res) =>{
    res.render('productos/verProductos');
   
 });

 router.get('/listaProductos', async (req,res) =>{
    const productos = await pool.query("SELECT * FROM v_productos WHERE estado = 1 order by idproducto");
    res.send(productos);
});


router.get('/agregarProductos', async (req,res) =>{
  res.render('productos/agregarProductos');
   
 });

 router.post('/agregarProductos', async (req,res) => {
    try {
     const {NOMBREPRODUCTO,Categoria,subCategoria,Imagen,precio} = req.body;
     await pool.query('call Agregar_Producto(?,?,?,?,?)',[NOMBREPRODUCTO,Categoria,subCategoria,Imagen,precio]);
     res.redirect('/productos/verProductos');
        
    } catch (e) {
 
        console.log(e);
    }
 });

 router.get('/editarProductos/:id', async (req,res) =>{
    try {
        const {id} = req.params;  
        const productos = await pool.query('Select * from v_productos where idProducto = ?',[id]);
        res.render('productos/editarProductos',{pr : productos[0]})
        console.log(productos);
    } catch (e) {
        console.log(e);
    }

});
router.post('/editarProductos/:id', async (req,res) =>{
    try {
        const {Nombre,Proveedor,Subrubro,Codigo,Descripcion,Gramage,medida,Precio,Stock,Imagen} = req.body;
        const {id} = req.params;  
        console.log(req.body);
        console.log(id);
        await pool.query('call Actualizar_Productos(?,?,?,?,?,?,?,?,?,?,?)',[id,Proveedor,Subrubro,Codigo,Descripcion,Gramage,medida,Precio,Stock,Nombre,Imagen]);
        res.redirect('/productos/verProductos');
        
    } catch (e) {
        console.log(e);
    }
});

router.post('/eliminarProducto/:id', async (req,res) =>{
    try {
        const {id} = req.params;
        const productos = await pool.query('call eliminar_Productos (?)',[id]);
        res.json(productos);
        console.log(id);
    } catch (e) {
        console.log(e)
    }
});


router.get('/seccion/:id', async (req,res) =>{

    try {
        const {id} = req.params;
        const rubro =  await pool.query('Select * from rubro where seccion = ?',id);
        res.json(rubro);
    } catch (error) {
        console.log(error);
    }

});


router.get('/rubro/:id', async (req,res) =>{

    try {
        const {id} = req.params;
        const subrubro =  await pool.query('Select * from subrubro where rubro = ?',id);
        res.json(subrubro);
    } catch (error) {
        console.log(error);
    }

});



module.exports = router;