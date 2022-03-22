package day4

import (
	"2021/helper"
	"fmt"
	"strings"
)

func Part1() {
	data := helper.ReadFile("./day4/data1.txt")
	inputAsString := string(data[:])
	input := strings.Split(inputAsString, "\n")

	numberString, cards := input[0], input[1:]

	numbers := strings.Split(numberString, ",")

	println(cards)

	// line = []Value
	for _, val := range cards {
		println(val)

	}
	//var line []Value
	// for i := range input {
	// 	line := input[i]

	// 	if i == 0 {
	// 		numberLine := strings.Split(line, ",")
	// 		for j := range numberLine {
	// 			num, err := strconv.Atoi(numberLine[j])
	// 			if err != nil {
	// 				log.Fatal(err)
	// 			}
	// 			numbers = append(numbers, num)
	// 		}
	// 	}
	// }

	fmt.Println(numbers)
}

/*
* [[22], [14]]
*
*
*
*
*/

