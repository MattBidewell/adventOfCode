/*
*
* If anyone looks at this code... please dont judge, im tired.
*
* Gets the most common bit and then reduces the array down...
* https://adventofcode.com/2021/day/3#part2
 */

package day3

import (
	"2021/helper"
	"fmt"
	"log"
	"strconv"
	"strings"
)


func Part2() {
	data := helper.ReadFile("./day3/data1.txt")
	inputAsString := string(data[:])
	o2input := strings.Split(inputAsString, "\n")
	co2input := strings.Split(inputAsString, "\n")
	o2Reduce := reducer(o2input, true)
	co2Reduce := reducer(co2input, false)

	o2int, err := strconv.ParseInt(o2Reduce[0], 2, 64)

	if err != nil {
		log.Fatal(err)
	}

	co2int, err := strconv.ParseInt(co2Reduce[0], 2, 64)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("o2 value: %d\n",o2int)
	fmt.Printf("co2 value: %d\n",co2int)
	fmt.Printf("total: %d\n", o2int * co2int)
}

func reducer(data[]string, isO2 bool) []string {

	index := 0
	for len(data) > 1 {

		binaryData := make([][]int, len(data[0]))

		// extract the bits out into columns
		for i:= range data {
			bitline := data[i]
			bits := strings.Split(bitline, "")
			for j := range bits {
				bit, err := strconv.Atoi(bits[j])
				if err != nil {
					log.Fatal(err)
				}
				binaryData[j] = append(binaryData[j], bit)
			}
		}

		// calculate most common bit
		bitcol := binaryData[index]
		var zero,one int
		for j := range bitcol {
			bit := bitcol[j]
			if bit == 0 {
				zero++
			} else {
				one++
			}
		}

		// remove lines from data
		if(zero > one) {
			// 0 is most common
			if(isO2) {
				data = removeFromArray(data, "0", index)
			} else {
				data = removeFromArray(data, "1", index)
			}
		} else {
			// 1 is most common
			if(isO2) {
				data = removeFromArray(data, "1", index)
			} else {
				data = removeFromArray(data, "0", index)
			}
		}
		index++
	}
	return data
}

func removeFromArray(arr []string, checkVal string, index int) []string {
	var newArr []string
	for i := 0; i < len(arr); i++ {
		curr := arr[i]
		bit := string(curr[index])
		if bit==checkVal {
			newArr = append(newArr, curr)
		}
	}
	return newArr
}
