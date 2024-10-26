# React game

use needs to pick 4 number that add up to the sum displayed. The user only has 10 seconds to complete the puzzle.

challenges:
  Using proper state and types for state
  generating unique random numbers
  passing the values back to the parent when a users picks one
  disabling the button after click. 

## code used to generate a random number

`
export const uniqueRandomNumbers = (count: number, max: number): gameButton[] => {
  const numbers = new Set<number>();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(numbers).map(value => ({ value, selected: false }));
}
`

