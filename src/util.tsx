export const randomNumberBetween = (
  min: number,
  max: number,
): number => Math.floor(Math.random() * (max - min + 1)) + min;

export type gameButton = {
  value: number;
  selected: boolean;
};


export const uniqueRandomNumbers = (count: number, max: number): gameButton[] => {
  const numbers = new Set<number>();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(numbers).map(value => ({ value, selected: false }));
}

export type gameState = 'new' | 'playing' | 'won' | 'lost';
