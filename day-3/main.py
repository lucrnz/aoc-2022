from sys import stdin

def letter_to_priority(letter):
    ascii_val = ord(letter)
    if letter >= 'A' and letter <= 'Z':
        return ascii_val - 64 + 26
    else:
        return ascii_val - 96


def compare_rucksacks(a, b):
    result = []
    for item in a:
        if item in b:
            result.append(item)
    return result

def aoc_day_3_solution(input):
    lines = input.split('\n') if '\n' in input else [input]
    output = []
    sum_of_priorities = 0

    for line in lines:
        sline = line.strip()
        sline_len = len(sline)
        if sline_len == 0:
            continue
        h_sline_len = int(sline_len / 2)
        pair = []
        pair.append(sline[:h_sline_len])
        pair.append(sline[h_sline_len:])
        common_items = set(compare_rucksacks(pair[0], pair[1]))
        priority_value = 0

        if len(common_items) > 0:
            for item in common_items:
                priority_value = priority_value + letter_to_priority(item)
            output.append(f"The rucksacks \"{pair[0]}\" and \"{pair[1]}\" have in common the follow items: \"{' '.join(common_items)}\"; Priority value: {priority_value}")
        else:
            output.append(f"The rucksacks \"{pair[0]}\" and \"{pair[1]}\" does not have items in common")

        if priority_value > 0:
            sum_of_priorities = sum_of_priorities + priority_value

    if sum_of_priorities > 0:
        output.append(f"The sum of the priorities for all of the items is: {sum_of_priorities}")

    return '\n'.join(output).strip()

print(aoc_day_3_solution(open(stdin.fileno(), 'r').read()))
