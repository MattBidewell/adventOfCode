/*
*
* The submarine has been making some odd creaking noises, so you ask it to produce a diagnostic report just in case.
*
* The diagnostic report (your puzzle input) consists of a list of binary numbers which, when decoded properly,
* can tell you many useful things about the conditions of the submarine.
* The first parameter to check is the power consumption.
*
* You need to use the binary numbers in the diagnostic report to generate two new binary numbers
* (called the gamma rate and the epsilon rate).
* The power consumption can then be found by multiplying the gamma rate by the epsilon rate.
*
* Each bit in the gamma rate can be determined by finding the most common bit in the corresponding position of all numbers
* in the diagnostic report. For example, given the following diagnostic report:
*
* 00100
* 11110
* 10110
* 10111
* 10101
* 01111
* 00111
* 11100
* 10000
* 11001
* 00010
* 01010
*
 */

package day3

import (
	"2021/helper"
	"fmt"
	"log"
	"strconv"
	"strings"
)

func Part1() {
	data := helper.ReadFile("./day3/data1.txt")
	inputAsString := string(data[:])
	input := strings.Split(inputAsString, "\n")

	columns := make([][]int, len(input[0]))

	// turn each column into an array of bits.
	for i := range input {
		bitline := input[i]
		bits := strings.Split(bitline, "")

		for j := range bits {
			bit, err := strconv.Atoi(bits[j])

			if err != nil {
				log.Fatal(err)
			}

			columns[j] = append(columns[j], bit)
		}
	}

	var gamma, eps []int

	// TODO: I am not a fan of this.
	// go through each column and count the bits.
	// if zero bits are more frequent that one bits, then append one to eps.
	for i := range columns {
		bitcol := columns[i]

		var zero,one int
		for j := range bitcol {
			bit := bitcol[j]
			if bit == 0 {
				zero++
			} else {
				one++
			}
		}
		if(zero > one) {
			gamma = append(gamma, 0)
			eps = append(eps, 1)
		} else {
			gamma = append(gamma, 1)
			eps = append(eps, 0)
		}
	}

	gammaBinString := strings.Trim(strings.ReplaceAll(fmt.Sprint(gamma)," ",""),"[]")
	gammaInt, err := strconv.ParseInt(gammaBinString, 2, 64)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Gamma: %d, Dec %d\n", gamma, gammaInt)

	epsBinString := strings.Trim(strings.ReplaceAll(fmt.Sprint(eps)," ",""),"[]")
	epsInt, err := strconv.ParseInt(epsBinString, 2, 64)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("eps:   %d, Dec %d\n", eps, epsInt)

	total := epsInt * gammaInt
	fmt.Printf("Eps * Gamma = %d\n", total)
}