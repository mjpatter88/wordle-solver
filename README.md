# wordle-solver
A puppeteer based bot that solves wordle in the browser.


## Approach
Use a simple letter frequency-based guessing approach to narrow down the solution space.
Optimized for simple implementation not optimal solving.

### Phase 1 - Letter guessing
Guess words based on letter frequency to narrow down the possible solutions.

### Phase 2 - Solution guession
Once the possible solution list has been narrowed down to 1, or there is only 1 guess left, guess the solution.


## Offline Processing
In order to educate the initial letter guessing phase, I did some quick offline processing to understand the frequency of letter usage in the dictionary.
From most frequent to least: `e, a, r, o, t, l, i, s, n, c, u, y, d, h, p, m, g, b, f, k, w, v, z, x, q, j`

Using this ordering, I then generated the list of 6 "best" words to guess in order to determine letter existence:
`alert, scion, dumpy, bough, flack, vowel`