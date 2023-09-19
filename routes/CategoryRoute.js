import express  from "express";
import  {requireSignIn, isAdmin } from './../middlewares/authMiddleware.js'
import { SingleCategoryController, categoryController, createCategoryController, deleteCategoryController, updateCategoryController } from "../controller/CategoryController.js";


const router = express.Router()
//create category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//upade category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//get All Categories
router.get('/get-category',categoryController)

//Single Category
router.get('/single-category/:slug',SingleCategoryController)

//Delete Single Category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)






export default router
