/**
Given a binary tree, return the zigzag level order traversal of its nodes' values. 
(ie, from left to right, then right to left for the next level and alternate between).

For example:
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
   
return its zigzag level order traversal as:

[
  [3],
  [20,9],
  [15,7]
]
====
VIDEO EXPLANATION =  https://www.youtube.com/watch?v=4u--XDffIZM (Akshay Saini)
====

**/

var zigzagLevelOrder = function (root) {
  let results = [];
  const lot = (root, level) => {
    if (!root) return; // if no root return

    if (results[level]) results[level].push(root.val); // if value exists
    else results[level] = [root.val]; // if value does not exist

    lot(root.left, level + 1); // check the left of the root
    lot(root.right, level + 1); // check the right of the root
  };
  lot(root, 0); // invoke the function with root and its level is 0
  return results.map((b, i) => (i % 2 ? b.reverse() : b));
};
