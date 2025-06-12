package main

import (
	"backend/backend/router"
)

func main() {
	r := router.NewRouter()
	r.Run(":8080")
}
