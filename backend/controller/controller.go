package controller

import (
	"backend/backend/handler"

	"github.com/gin-gonic/gin"
)

type Controller struct {
	Issuer      *handler.IssuerHandler
	Category    *handler.CategoryHandler
	Transaction *handler.TransactionHandler
}

func RegisterRoutes(r *gin.Engine, c *Controller) {
	// Issuer routes
	issuer := r.Group("/issuers")
	issuer.GET("", c.Issuer.GetAll)
	issuer.POST("", c.Issuer.Create)

	// Category routes
	category := r.Group("/categories")
	category.GET("", c.Category.GetAll)
	category.POST("", c.Category.Create)

	// Transaction routes
	transaction := r.Group("/transactions")
	transaction.GET("", c.Transaction.GetAll)
	transaction.POST("", c.Transaction.Create)
}
