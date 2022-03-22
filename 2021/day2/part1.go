/*
*
* Now, you need to figure out how to pilot this thing.
*
* It seems like the submarine can take a series of commands like forward 1, down 2, or up 3:
*
* forward X increases the horizontal position by X units.
* down X increases the depth by X units.
* up X decreases the depth by X units.
* Note that since you're on a submarine, down and up affect your depth,
* and so they have the opposite result of what you might expect.
*
 */

package day2

import (
	"2021/helper"
	"fmt"
	"log"
	"strconv"
	"strings"
)

func Part1() {
	sub := submarine{depth: 0, horizontal: 0}

	data := helper.ReadFile("./day2/data1.txt")
	inputAsString := string(data[:])
	input := strings.Split(inputAsString, "\n")

	for i := range input {
		line := input[i]
		s := strings.Split(line, " ")
		instruction, value := s[0], s[1]

		num, err := strconv.Atoi(value)

		if err != nil {
			log.Fatal(err)
		}

		switch instruction {
			case "forward":
				sub.horizontal += num
			case "down":
				sub.depth += num
			case "up":
				sub.depth -= num
		}
	}

	fmt.Println(sub)
	total := sub.depth * sub.horizontal
	fmt.Println(total)

}
