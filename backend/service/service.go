package service

import (
	"backend/backend/entity"
	"backend/backend/repository"
)

type IssuerService struct {
	repo repository.IssuerRepository
}

func NewIssuerService(repo repository.IssuerRepository) *IssuerService {
	return &IssuerService{repo}
}
func (s *IssuerService) GetAll() ([]entity.Issuer, error) {
	return s.repo.FindAll()
}
func (s *IssuerService) Create(issuer *entity.Issuer) error {
	return s.repo.Create(issuer)
}

type CategoryService struct {
	repo repository.CategoryRepository
}

func NewCategoryService(repo repository.CategoryRepository) *CategoryService {
	return &CategoryService{repo}
}
func (s *CategoryService) GetAll() ([]entity.Category, error) {
	return s.repo.FindAll()
}
func (s *CategoryService) Create(category *entity.Category) error {
	return s.repo.Create(category)
}

type TransactionService struct {
	repo repository.TransactionRepository
}

func NewTransactionService(repo repository.TransactionRepository) *TransactionService {
	return &TransactionService{repo}
}
func (s *TransactionService) GetAll() ([]entity.Transaction, error) {
	return s.repo.FindAll()
}
func (s *TransactionService) Create(transaction *entity.Transaction) error {
	return s.repo.Create(transaction)
}
