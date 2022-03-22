package helper

import (
	"io/ioutil"
	"log"
)

func ReadFile(filename string) []byte {
	content, err := ioutil.ReadFile(filename)
	if err != nil {
		log.Fatal(err)
	}

	return content
}
