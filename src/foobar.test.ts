import { expect, test } from "vitest";
import { displayPlayerIndexOutput } from "./foobar";

test.each([
  { input: 1, output: "1" },
  { input: 2, output: "2" },
  { input: 3, output: "foo" },
  { input: 4, output: "baz" },
  { input: 5, output: "bar" },
  { input: 7, output: "jazz" },
  { input: 9, output: "foohuzz" },
  { input: 11, output: "11" },
  { input: 12, output: "foobaz" },
  { input: 15, output: "foobar" },
  { input: 20, output: "bazbar" },
  { input: 21, output: "foojazz" },
  { input: 28, output: "bazjazz" },
  { input: 35, output: "barjazz" },
  { input: 36, output: "foobazhuzz" },
  { input: 45, output: "foobarhuzz" },
  { input: 60, output: "foobazbar" },
  { input: 63, output: "foojazzhuzz" },
  { input: 84, output: "foobazjazz" },
  { input: 90, output: "foobarhuzz" },
  { input: 100, output: "bazbar" },
])("displayPlayerIndexOutput($input) -> $output", ({ input, output }) => {
  expect(displayPlayerIndexOutput(input)).toBe(output);
});
