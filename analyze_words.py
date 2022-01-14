import pathlib
import heapq
from collections import Counter

ANSWER_LINE_START = "let answers = ["

def get_current_file_location():
    return pathlib.Path(__file__).parent.resolve()

def get_word_list_location():
    return get_current_file_location() / "src" / "word_lists.ts"

def get_answer_line(lines):
    for line in lines:
        if line.startswith(ANSWER_LINE_START):
            return line
    assert True == False, "Answer list not found"

def get_answer_list(answer_line):
    text = answer_line.strip()
    text = text.removesuffix("];")
    text = text.replace(ANSWER_LINE_START, "")
    text = text.replace("\"", "")
    text = text.replace(" ", "")
    return text.split(",")

def get_letter_counts(answers):
    counter = Counter()
    for answer in answers:
        counter.update(answer)
    return counter

# The most frequent letters are worth the most points.
def calculate_letter_points(answers):
    freqs = get_letter_counts(answers)
    points = dict()
    for index, entry in enumerate(reversed(freqs.most_common())):
        points[entry[0]] = index
    return points


def score_word(word, points):
    # make a copy so we can make changes after each letter without changing the original
    local_points = points.copy()
    total = 0
    for letter in word:
        total += local_points[letter]
        # Duplicate letters should not add additional points
        local_points[letter] = 0
    return total

def find_next_word(answers, points):
    # Use python built in heap (https://docs.python.org/3/library/heapq.html)
    heap = []
    for word in answers:
        score = score_word(word, points)
        # We negate the point value because we want a max heap.
        heapq.heappush(heap, (-score, word))
    return heapq.heappop(heap)

def run():
    lines = []
    with open(get_word_list_location(), 'r') as f:
        lines = f.readlines()
    answers = get_answer_list(get_answer_line(lines))
    points = calculate_letter_points(answers)

    # Print top 6 words
    for _ in range(6):
        score, word = find_next_word(answers, points)
        print(f"{word}: {-score}")
        # No value in guesing a letter that has already been guessed
        for letter in word:
            points[letter] = 0

if __name__ == "__main__":
    run()
