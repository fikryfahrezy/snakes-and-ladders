const DIVISOR_WORDS = [
  [3, "foo"],
  [4, "baz"],
  [5, "bar"],
  [7, "jazz"],
  [9, "huzz"],
] as const;

/**
 * With assumptions:
 *
 * The spec defines combining ("foobar") only for 3 and 5. Rule 6.5 says to use
 * "the same divisible logic", so I applied it to every divisor in the table:
 *
 * - Every divisor that divides the index adds its word, joined in table order
 * (3 → 4 → 5 → 7 → 9). Examples: 12 → `foobaz`, 60 → `foobazbar`,
 * 84 → `foobazjazz`.
 * - Every multiple of 9 is also a multiple of 3, so those indices show both
 * words (9 → `foohuzz`, 45 → `foobarhuzz`). `huzz` never appears alone.
 * - If no divisor matches, the index is shown as a number.
 *
 * The other reading, where only 3 and 5 combine, would need a priority rule the
 * spec doesn't give (for example, is 12 `foo` or `baz`?).
 */
export const displayPlayerIndexOutput = (index: number) => {
  const output = DIVISOR_WORDS.filter(([divisor]) => index % divisor === 0)
    .map(([, word]) => word)
    .join("");

  return output || String(index);
};
