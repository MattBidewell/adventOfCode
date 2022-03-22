package day1

import (
	"2021/helper"
	"fmt"
	"log"
	"strconv"
	"strings"
)

func Part1() {

	input := helper.ReadFile("./day1/data1.txt")

	inputAsString := string(input[:])
	inputAsArray := strings.Split(inputAsString, "\n")

	var asc []string
	var desc []string

	for i := 0; i < len(inputAsArray); i++ {
		pos := inputAsArray[i]

		if pos != "" {

			// convert string into number
			curr, err := strconv.Atoi(inputAsArray[i])
			if err != nil {
				log.Fatal(err)
			}

			if i == 0 {
				fmt.Printf("Start...\n")
			} else {

				// convert input into string
				prev, err := strconv.Atoi(inputAsArray[i-1])

				if err != nil {
					log.Fatal(err)
				}

				if prev > curr {
					desc = append(desc, "decreased")
				} else {
					asc = append(asc, "increased")
				}
			}
		}
	}

	ascLength := strconv.Itoa(len(asc))
	descLength := strconv.Itoa(len(desc))

	fmt.Printf("Asc %s\n", ascLength)
	fmt.Printf("Desc %s\n", descLength)
}
