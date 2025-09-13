---
title: "1. Two Sum"
difficulty: "Easy"
tags: ["Array", "Hash Table"]
date: "2025-09-13"
---

### 🔍 풀이 과정
해시맵(Hash Map)을 사용하여 $O(n)$의 시간 복잡도로 해결할 수 있습니다. 배열을 한 번 순회하면서...

### ⏱️ 시간 복잡도 / 📦 공간 복잡도
- **시간 복잡도**: $O(n)$
- **공간 복잡도**: $O(n)$

### 💡 코드
```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
};
```
