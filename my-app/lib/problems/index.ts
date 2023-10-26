import { jumpGame } from "./jump-game";
import { reverseLinkedList } from "./reverse-linkedlist";
import { search2DMatrix } from "./seach-a-2d-matrix";
import { twoSum } from "./two-sum";
import { Problem } from "./types";
import { validParentheses } from "./valid-parenthesis";

interface ProblemMap {
  [key: string]: Problem;
}
export const problems: ProblemMap = {
  "two-sum": twoSum,
  "reverse-linked-list": reverseLinkedList,
  "jump-game": jumpGame,
  "search-a-2d-matrix": search2DMatrix,
  "valid-parentheses": validParentheses,
};
