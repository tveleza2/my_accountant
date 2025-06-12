package entity

import "time"

type Issuer struct {
	ID   uint   `gorm:"primaryKey" json:"id"`
	Name string `json:"name"`
}

type Category struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type Transaction struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	IssuerID     uint      `json:"issuer_id"`
	CategoryID   uint      `json:"category_id"`
	Date         time.Time `json:"date"`
	InvoiceImage string    `json:"invoice_image"`
	Amount       float64   `json:"amount"`
	Type         string    `json:"type"` // 'income' or 'expense'
	Concept      string    `json:"concept"`
}
