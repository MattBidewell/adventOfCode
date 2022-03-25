package day5

import (
	"2021/helper"
	"fmt"
	"strconv"
	"strings"
)


func Part1() {

	data := helper.ReadFile("./day5/data1.txt")
	inputAsString := string(data[:])
	input := strings.Split(inputAsString, "\n")

	ventPoints := setupPoints(input)
	board := setUpBoard(999,999)

	// printBoard(board, false)
	// time.Sleep(1 * time.Second)
	for _, ventPoint := range ventPoints {
		board = markBoard(board, ventPoint.start, ventPoint.end)
		// printBoard(board, true)
		// time.Sleep(1 * time.Second)
	}
	awns := evaluateBoard(board)
	fmt.Println(awns)
}

func setUpBoard(rowSize int, columnSize int) [][]int {
	var board [][]int
	for i := 0; i < rowSize; i++ {
		var row []int
		for i:= 0; i < columnSize; i++ {
			row = append(row, 0)
		}
		board = append(board, row)
	}
	return board
}

func setupPoints(input []string) []Vent {
	var vents []Vent

	for _, singleInput := range input {
		if(singleInput == "") {
			break
		}
		points := strings.Split(singleInput, " -> ")
		startRaw := strings.Split(points[0], ",")
		endRaw := strings.Split(points[1], ",")

		startXStr := startRaw[0]
		startYStr := startRaw[1]
		endXstr := endRaw[0]
		endYstr := endRaw[1]

		startX, errXs := strconv.Atoi(startXStr)
		startY, errYs := strconv.Atoi(startYStr)
		endX, errXe := strconv.Atoi(endXstr)
		endY, errYe := strconv.Atoi(endYstr)

		helper.HandleErr(errXs)
		helper.HandleErr(errYs)
		helper.HandleErr(errXe)
		helper.HandleErr(errYe)

		startPoint := Point{
			x: startX,
			y: startY,
		}

		endPoint := Point {
			x: endX,
			y: endY,
		}

		vent := Vent {
			start: startPoint,
			end: endPoint,
		}

		vents = append(vents, vent)
	}
	return vents
}

func markBoard(board [][]int, start Point, end Point) [][]int {
	if start.x == end.x {
		diff := start.y - end.y
		board[start.x][start.y]++

		for diff != 0 {
			if diff < 0 {
				start.y = start.y + 1
				diff++
			} else {
				start.y = start.y - 1
				diff--
			}
			board[start.x][start.y]++
		}
	} else if start.y == end.y {
		diff := start.x - end.x
		board[start.x][start.y]++

		for diff != 0 {
			if diff < 0 {
				start.x = start.x + 1
				diff++
			} else {
				start.x = start.x - 1
				diff--
			}
			board[start.x][start.y]++
		}
	}

	return board
}

func printBoard(board [][]int, resetCurser bool) {
	output := ""

	if resetCurser {
		output = resetCursor("10") + output
	}

	for _, row := range board {
		for _, column := range row {
			output = output + strconv.Itoa(column)
		}
		output = output + "\n"
	}
	fmt.Print(output)
}

func resetCursor(lines string) string {
	return "\x1B[" + lines + "A" + "\x1B[0K"
}

func evaluateBoard(board [][]int) int {
	var counter int
	for _, col := range board {
		for _, col2 := range col {
			if col2 > 1 {
				counter++
			}
		}
	}
	return counter
}

