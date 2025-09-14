---
title: "Longest Substring Without Repeating Characters"
difficulty: "Medium"
tags: ["Hash Table", "String", "Sliding Window"]
date: "2024-01-03"
leetcode_url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
---

# Longest Substring Without Repeating Characters

Given a string `s`, find the length of the **longest substring** without repeating characters.

## Example 1:

```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

## Example 2:

```
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

## Example 3:

```
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

## Solution

```typescript
function lengthOfLongestSubstring(s: string): number {
    const charMap = new Map<string, number>();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        if (charMap.has(char) && charMap.get(char)! >= left) {
            left = charMap.get(char)! + 1;
        }
        
        charMap.set(char, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}
```

## Time Complexity: O(n)
## Space Complexity: O(min(m, n))
