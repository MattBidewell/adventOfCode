package day1

import (
	"2021/helper"
	"fmt"
	"log"
	"strconv"
	"strings"
)

func Part2() {
	input := helper.ReadFile("./day1/data1.txt")
	myString := string(input[:])
	stringsplit := strings.Split(myString, "\n")

	var asc []string
	var desc []string
	var sums []int

	for i := 0; i < len(stringsplit)-2; i++ {
		pos := stringsplit[i]

		if pos != "" {
			first, err1 := strconv.Atoi(stringsplit[i])
			second, err2 := strconv.Atoi(stringsplit[i+1])
			third, err3 := strconv.Atoi(stringsplit[i+2])

			if err1 != nil || err2 != nil || err3 != nil {
				log.Fatal(err1)
				log.Fatal(err2)
				log.Fatal(err3)
			}

			sum := (first + second + third)
			sums = append(sums, sum)
		}
	}

	for i := 0; i < len(sums); i++ {
		curr := sums[i]

		if i == 0 {
			fmt.Printf("Start...\n")
		} else {

			prev := sums[i-1]

			if prev < curr {
				asc = append(asc, "increased")
			} else {
				desc = append(desc, "decreased")
			}
		}

	}

	ascLength := strconv.Itoa(len(asc))
	descLength := strconv.Itoa(len(desc))

	fmt.Printf("Asc %s\n", ascLength)
	fmt.Printf("Desc %s \n", descLength)
}
