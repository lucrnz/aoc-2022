package main

import (
	"fmt"
	"io"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	stdin, err := io.ReadAll(os.Stdin)

	if err != nil {
		panic(err)
	}

	inputStr := string(stdin)
	var input []string

	elfCount := 0
	var elfData []int

	if strings.Contains(inputStr, "\n") {
		input = strings.Split(strings.TrimSpace(inputStr), "\n")
	} else {
		input = append(input, inputStr)
	}

	for _, el := range input {
		// New elf
		if len(el) == 0 {
			elfData = append(elfData, elfCount)
			elfCount = 0
			continue
		}

		elInt, err := strconv.Atoi(el)
		if err != nil {
			panic(err)
		}

		elfCount = elfCount + elInt
	}

	elfDataSorted := elfData
	sort.Ints(elfDataSorted)
	maxValue := elfDataSorted[len(elfDataSorted)-1]

	for idx, el := range elfData {
		if el == maxValue {
			fmt.Printf("The %vth elf has the most calories with: %v\n", idx+1, el)
			break
		} else {
			fmt.Printf("The %vth elf has: %v calories\n", idx+1, el)
		}
	}
}
