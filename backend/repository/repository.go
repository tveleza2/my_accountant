package repository

import (
	"backend/backend/entity"

	"gorm.io/gorm"
)

type IssuerRepository interface {
	FindAll() ([]entity.Issuer, error)
	Create(issuer *entity.Issuer) error
}

type CategoryRepository interface {
	FindAll() ([]entity.Category, error)
	Create(category *entity.Category) error
}

type TransactionRepository interface {
	FindAll() ([]entity.Transaction, error)
	Create(transaction *entity.Transaction) error
}

// GORM Implementations

type issuerGormRepo struct{ db *gorm.DB }

func NewIssuerRepository(db *gorm.DB) IssuerRepository {
	return &issuerGormRepo{db}
}
func (r *issuerGormRepo) FindAll() ([]entity.Issuer, error) {
	var issuers []entity.Issuer
	result := r.db.Find(&issuers)
	return issuers, result.Error
}
func (r *issuerGormRepo) Create(issuer *entity.Issuer) error {
	return r.db.Create(issuer).Error
}

type categoryGormRepo struct{ db *gorm.DB }

func NewCategoryRepository(db *gorm.DB) CategoryRepository {
	return &categoryGormRepo{db}
}
func (r *categoryGormRepo) FindAll() ([]entity.Category, error) {
	var categories []entity.Category
	result := r.db.Find(&categories)
	return categories, result.Error
}
func (r *categoryGormRepo) Create(category *entity.Category) error {
	return r.db.Create(category).Error
}

type transactionGormRepo struct{ db *gorm.DB }

func NewTransactionRepository(db *gorm.DB) TransactionRepository {
	return &transactionGormRepo{db}
}
func (r *transactionGormRepo) FindAll() ([]entity.Transaction, error) {
	var transactions []entity.Transaction
	result := r.db.Find(&transactions)
	return transactions, result.Error
}
func (r *transactionGormRepo) Create(transaction *entity.Transaction) error {
	return r.db.Create(transaction).Error
}
