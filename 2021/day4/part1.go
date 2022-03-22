package day4

import (
	"2021/helper"
	"fmt"
	"strconv"
	"strings"

	"github.com/fatih/color"
)

func Part1() {
	data := helper.ReadFile("./day4/data1.txt")
	total := runTaskPart1(data)
	fmt.Println("Total: ", strconv.Itoa(total))
}

func Part2() {
	data := helper.ReadFile("./day4/data1.txt")
	total := runTaskPart2(data)
	fmt.Println("Total: ", strconv.Itoa(total))
}

func runTaskPart1(data []byte) int {
	inputAsString := string(data[:])
	input := strings.Split(inputAsString, "\n")

	drawnNumbersString, rawCardsData := input[0], input[1:]
	drawnNumbers := strings.Split(drawnNumbersString, ",")
	cards := generateCards(rawCardsData)

	for round, drawnNumber := range drawnNumbers {
		for _, card := range cards {
			number, err := strconv.Atoi(drawnNumber)
			helper.HandleErr(err)
			markCard(&card, number)
			if round > 4 {
				result := evaluateCard(card)
				if result {
					return calcScore(card, number)
				}
			}
		}
	}
	return 0
}

func runTaskPart2(data []byte) int {
	inputAsString := string(data[:])
	input := strings.Split(inputAsString, "\n")

	drawnNumber := ""
	drawnNumbersString, rawCardsData := input[0], input[1:]
	drawnNumbers := strings.Split(drawnNumbersString, ",")
	cards := generateCards(rawCardsData)


	var finalCard Card
	var finalDrawnNumber string
	for ok := true; ok; ok = len(cards) > 0 {
		drawnNumber, drawnNumbers = drawnNumbers[0], drawnNumbers[1:]

		number, err := strconv.Atoi(drawnNumber)
		helper.HandleErr(err)

		for i:= 0; i < len(cards); i++ {
			card := cards[i]
			markCard(&card, number)
			result := evaluateCard(card)
			if result {
				cards = append(cards[:i], cards[i+1:]...)
				finalDrawnNumber = drawnNumber
				i = i-1
				if len(cards) == 1 {
					finalCard = cards[0]
				}
			}
		}
	}

	number, err := strconv.Atoi(finalDrawnNumber)
	helper.HandleErr(err)

	return calcScore(finalCard, number)
}

// Helpers
func markCard(card *Card, drawnNumber int) {
	for colInd, column := range card.columns {
		for valInd, val := range column {
			if val.value == drawnNumber {
				card.columns[colInd][valInd].isMarked = true

				// val.isMarked = true
			}
		}
	}
	for colInd, row := range card.rows {
		for valInd, val := range row {
			if val.value == drawnNumber {
				card.rows[colInd][valInd].isMarked = true
			}
		}
	}
}

// iterate through each row and column to see if an array is fully marked.
func evaluateCard(card Card) bool {
	for _, row := range card.rows {
		hasWinner := evaluateRowOrCol(row)
		if hasWinner {
			return true
		}
	}

	for _, col := range card.columns {
		hasWinner := evaluateRowOrCol(col)
		if hasWinner {
			return true
		}
	}

	return false
}

// evaluate if all items are true
func evaluateRowOrCol(vals []Value) bool {
	for _, val := range vals {
		if val.isMarked == false {
			return false
		}
	}
	return true
}

// find all unmarked values and times them by the most recently drawn number
func calcScore(card Card , multiplier int) int {
	var unmarkedTotal int
	for _, row := range card.rows {
		for _, val := range row {
			if !val.isMarked {
				unmarkedTotal = unmarkedTotal + val.value
			}
		}
	}
	total := unmarkedTotal * multiplier
	return total
}

func generateCards(input []string) []Card {
	var rawCards [][]string
	rawCard := []string{}

	for index, line:= range input {
		if line == "" { // empty line = end of card
			rawCards = append(rawCards, rawCard)
			rawCard = nil
		} else {
			rawCard = append(rawCard, line)
			if index == len(input)-1 {
				rawCards = append(rawCards, rawCard)
			}
		}
	}

	var cards []Card
	for index, card:= range rawCards {
		if(index != 0 ) {
			rows := generateRows(card)
			columns := generateColumns(card)

			card := Card{
				rows: rows,
				columns: columns,
			}
			cards = append(cards, card)
		}
	}
	return cards
}

/*
Takes a string of numbers and generate all rows.
input = [
	[1,2,3,4,5],
	[5,6,7,8,9]
]
output =
[
	[ { value: 1, isMarked: false },...]
]
*/
func generateRows(card[]string) [][]Value {
	rows := [][]Value{}
	for _, line:= range card {
		row := []Value{}
		numbers := strings.Split(line, " ")
		for _, numberString := range numbers {
			if(numberString != "") {
				number, err := strconv.Atoi(numberString)

				helper.HandleErr(err)

				val := Value{
					value: number,
					isMarked: false,
				}

				row = append(row, val)
			}
		}
		rows = append(rows, row)
	}
	return rows
}

func generateColumns(card[]string) [][]Value {
	var col1, col2, col3, col4, col5 []Value
	for _, line:= range card {
		numbers := strings.Split(line, " ")
		filteredNumbers := removeEmptyStrings(numbers)
		for index, numberString := range filteredNumbers {
			number, err := strconv.Atoi(numberString)
			helper.HandleErr(err)

			val := Value{
				value: number,
				isMarked: false,
			}

			switch(index) {
				case 0:
					col1 = append(col1, val)
				case 1:
					col2 = append(col2, val)
				case 2:
					col3 = append(col3, val)
				case 3:
					col4 = append(col4, val)
				case 4:
					col5 = append(col5, val)
				default:
					color.Red("You defo shouldnt be here...")
			}
		}
	}
	var columns [][]Value
	columns = append(columns, col1)
	columns = append(columns, col2)
	columns = append(columns, col3)
	columns = append(columns, col4)
	columns = append(columns, col5)
	return columns
}

func removeEmptyStrings(values []string) []string{
	var newStrings []string
	for _, val := range values {
		if val != "" {
			newStrings = append(newStrings, val)
		}
	}
	return newStrings
}