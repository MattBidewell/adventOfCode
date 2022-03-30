package day6

import (
	"2021/helper"
	"fmt"
	"strconv"
	"strings"
)

func Part1And2() {
	data := helper.ReadFile("./day6/data.txt")
	inputAsString := string(data[:])
	input := strings.Split(inputAsString, ",")
	var cycles [9]int

	// count the number of X numbers in data set. Eg five 1's...
	for _, cycStr := range input {
		cyc, err := strconv.Atoi(cycStr)
		helper.HandleErr(err)
		cycles[cyc]++
	}

	var day80 [9]int
	for i := 0; i < 256; i++ {
		if(i == 81) {
			day80 = cycles
		}
		tmp := 0
		var newCycles [9]int
		for j := 0; j < len(cycles); j++ {
			if j == 0 {
				// hold the first iteration temporary
				tmp = cycles[0]
			} else {
				// left shift the array
				newCycles[j-1] = cycles[j]
			}
		}
		// rules state we should set fish that reach 0, back to 6 but spawn new ones at 8.
		newCycles[6] = newCycles[6] + tmp
		newCycles[8] = tmp
		cycles = newCycles
	}

	total80 := 0
	for _, val := range day80 {
		total80 = total80 + val;
	}

	total := 0
	for _, val := range cycles {
		total = total + val;
	}

	fmt.Println("Part 1 Total: " + strconv.Itoa(total80))
	fmt.Println("Part 2 Total: " + strconv.Itoa(total))
}

// Brute force attempt lol... dont try this at home kids...
// Not used but good to learn from mistakes
func incrementDay(fishys []int) []int {
	var t []int
	var newFishys [] int
	for _, fish := range fishys {
		newFish := fish - 1
		if newFish < 0 {
			newFishys = append(newFishys, 8)
			newFish = 6
		}
		t = append(t, newFish)
	}
	next := append(t, newFishys...)
	return next
}
