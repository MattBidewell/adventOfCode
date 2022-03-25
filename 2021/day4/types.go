package day4

type Value struct {
	value 		int
	isMarked 	bool
}

type Card struct {
	rows 					[][]Value
	columns 			[][]Value
}
