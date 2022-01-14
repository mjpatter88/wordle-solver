import pathlib
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

def run():
    lines = []
    with open(get_word_list_location(), 'r') as f:
        lines = f.readlines()
    answers = get_answer_list(get_answer_line(lines))
    print(get_letter_counts(answers))


if __name__ == "__main__":
    run()
