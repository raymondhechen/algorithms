class Solution1:
    def lengthOfLongestSubstring(self, s: str) -> int:
        if s == " ":
            return 1
        
        ans = 0
        for i in range(len(s)):
            seen = []
            subAns = 0
            for j in range(i, len(s)):
                if s[j] not in seen:
                    seen.append(s[j])
                    subAns += 1
                else:
                    break
            if subAns > ans:
                ans = subAns
        return ans