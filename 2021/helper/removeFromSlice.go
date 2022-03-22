package helper

func Remove(slice []string, i int) []string {
    return append(slice[:i], slice[i+1:]...)
}