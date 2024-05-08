const router = require('express').Router()
const { getAll, getById, addProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')

// Routes accessible to both buyers and sellers
router.get('/', getAll)
router.get('/:id', getById)

// Routes accessible to only sellers
router.post('/', authMiddleware, addProduct)
router.put('/:id', authMiddleware, updateProduct)
router.delete('/:id', authMiddleware, deleteProduct)

module.exports = router;
