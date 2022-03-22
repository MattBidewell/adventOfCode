package helper

import (
	"fmt"
	"os"
)

func HandleErr(err error) {
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}