package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	file, err := os.Open("../input.txt")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()
	var result int
	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := scanner.Text()
		parts := strings.Split(line, ":")
		if len(parts) < 2 {
			continue
		}

		x := strings.TrimSpace(parts[1])
		arrays := strings.Split(x, " | ")

		if len(arrays) != 2 {
			continue
		}

		var a []int

		for _, i := range arrays {
			parts := strings.Fields(i)
			for _, y := range parts {
				num, err := strconv.Atoi(y)
				if err != nil {
					fmt.Println("Error", err)
				}

				a = append(a, num)
			}
		}

		t := a[0:10]
		t2 := a[10:]
		count := 0

		for _, q := range t2 {
			for _, value := range t {
				if q == value {
					count++
				}
			}
		}

		if count > 0 {
			result += 1 << (count - 1)
		}
	}
	fmt.Println(result)
}
