package main

import (
	"2021/day1"
	"2021/day2"
	"2021/day3"
	"2021/day4"
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/fatih/color"
)

func main() {
	printTitle()
	time.Sleep(1 * time.Second)
	for i:=1; i < 31; i++ {
		runDay(i)
		time.Sleep(1 * time.Second)
	}
}


func runDay(day int) {
	color.Cyan("\n***** Day " + strconv.Itoa(day))
	switch(day) {
		case 1:
			day1.Part1()
			day1.Part2()
		case 2:
			day2.Part1()
			day2.Part2()
		case 3:
			day3.Part1()
			day3.Part2()
		case 4:
			day4.Part1()
			day4.Part2()
		// case 5:
		// 	day5.Part1()
		// 	day5.Part2()
		// case 6:
		// 	day6.Part1()
		// 	day6.Part2()
		// case 7:
		// 	day7.Part1()
		// 	day7.Part2()
		// case 8:
		// 	day8.Part1()
		// 	day8.Part2()
		// case 9:
		// 	day9.Part1()
		// 	day9.Part2()
		// case 10:
		// 	day10.Part1()
		// 	day10.Part2()
		// case 11:
		// 	day11.Part1()
		// 	day11.Part2()
		// case 12:
		// 	day12.Part1()
		// 	day12.Part2()
		// case 13:
		// 	day13.Part1()
		// 	day13.Part2()
		// case 14:
		// 	day14.Part1()
		// 	day14.Part2()
		// case 15:
		// 	day15.Part1()
		// 	day15.Part2()
		// case 16:
		// 	day16.Part1()
		// 	day16.Part2()
		// case 18:
		// 	day18.Part1()
		// 	day18.Part2()
		// case 19:
		// 	day19.Part1()
		// 	day19.Part2()
		// case 20:
		// 	day20.Part1()
		// 	day20.Part2()
		// case 21:
		// 	day21.Part1()
		// 	day21.Part2()
		// case 22:
		// 	day22.Part1()
		// 	day22.Part2()
		// case 23:
		// 	day23.Part1()
		// 	day23.Part2()
		// case 24:
		// 	day24.Part1()
		// 	day24.Part2()
		// case 25:
		// 	day25.Part1()
		// 	day25.Part2()
		// case 26:
		// 	day26.Part1()
		// 	day26.Part2()
		// case 27:
		// 	day27.Part1()
		// 	day27.Part2()
		// case 28:
		// 	day28.Part1()
		// 	day28.Part2()
		// case 29:
		// 	day29.Part1()
		// 	day29.Part2()
		// case 30:
		// 	day30.Part1()
		// 	day30.Part2()
		// case 31:
		// 	day31.Part1()
		// 	day31.Part2()
		default :
			color.Red("opps not implemented yet")
			os.Exit(0)
	}
	color.Yellow("****")
}

func printTitle() {
	fmt.Println(".d888b.  .d88b.  .d888b.  db")
	fmt.Println("VP  `8D .8P  88. VP  `8D o88")
	fmt.Println("   odD' 88  d'88    odD'  88")
	fmt.Println(" .88'   88 d' 88  .88'    88")
	fmt.Println("j88.    `88  d8' j88.     88")
	fmt.Println("888888D  `Y88P'  888888D  VP")
}