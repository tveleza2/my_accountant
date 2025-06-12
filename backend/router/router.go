package router

import (
	"backend/backend/controller"
	"backend/backend/entity"
	"backend/backend/handler"
	"backend/backend/repository"
	"backend/backend/service"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func NewRouter() *gin.Engine {
	db, err := gorm.Open(sqlite.Open("accounting_server.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(&entity.Issuer{}, &entity.Category{}, &entity.Transaction{})

	issuerRepo := repository.NewIssuerRepository(db)
	categoryRepo := repository.NewCategoryRepository(db)
	transactionRepo := repository.NewTransactionRepository(db)

	issuerService := service.NewIssuerService(issuerRepo)
	categoryService := service.NewCategoryService(categoryRepo)
	transactionService := service.NewTransactionService(transactionRepo)

	issuerHandler := handler.NewIssuerHandler(issuerService)
	categoryHandler := handler.NewCategoryHandler(categoryService)
	transactionHandler := handler.NewTransactionHandler(transactionService)

	ctrl := &controller.Controller{
		Issuer:      issuerHandler,
		Category:    categoryHandler,
		Transaction: transactionHandler,
	}

	r := gin.Default()
	controller.RegisterRoutes(r, ctrl)
	return r
}
