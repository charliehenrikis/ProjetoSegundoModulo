import express from 'express'
import {
  createUserController,
  deleteController,
  loginController,
  listAllController,
} from '../controller/UserController'
import validateRoute from '../middleware/validateRoute'
import * as userSchema from '../schemas/userSchemas'
import * as productSchema from '../schemas/productSchema'
import { authenticateToken } from '../middleware/validateLogin'
import { isAdmin } from '../middleware/verifyPermissions'
import {
  EditProductByID,
  ListProductByID,
  createProductController,
  listAllProduct,
  listAvailableProduct,
} from '../controller/productController'
import { uploadPhotoMiddleware } from '../middleware/upload'
import { filePhotoProduct } from '../middleware/filePhotoProducts'
import { filePhotoUsers } from '../middleware/filephotoUsers'

export const router = express.Router()

// rota de criação de usuario
router.post(
  '/User',
  validateRoute(userSchema.CreatePerson.schema),
  createUserController
)

// rota de login => token jwt
router.post(
  '/User/login',
  validateRoute(userSchema.LoginPerson.schema),
  loginController
)

// rota de listar todos os usuarios apenas se for admin
router.get('/User', authenticateToken, isAdmin, listAllController)

// rota de delete pelo id se estiver logado
router.delete('/User/:id', authenticateToken, isAdmin, deleteController)

// rota de criação de produto se for admin
router.post(
  '/products',
  validateRoute(productSchema.CreateProducts.schema),
  authenticateToken,
  isAdmin,
  createProductController
)

// rota de adicionar imagem via multer de produtos
router.patch(
  '/products/uploadImage/:id',
  authenticateToken,
  isAdmin,
  uploadPhotoMiddleware,
  filePhotoProduct
)

// rota de adicionar imagem via multer de Usuarios
router.patch(
  '/users/uploadImage/:id',
  authenticateToken,
  isAdmin,
  uploadPhotoMiddleware,
  filePhotoUsers
)

// rota de listar todos os produtos apenas se for admin
router.get('/products', authenticateToken, isAdmin, listAllProduct)

// rota de buscar o produto pelo id
router.get('/products/:id', authenticateToken, isAdmin, ListProductByID)

// rota de buscar os produtos existentes se for admin
router.get('/products', authenticateToken, isAdmin, listAvailableProduct)

// rota de atualizar produto se for admin
router.put(
  '/products/:id',
  validateRoute(productSchema.CreateProducts.schema),
  authenticateToken,
  isAdmin,
  EditProductByID
)
