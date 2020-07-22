class Solution:
    def longestPalindrome(self, s: str) -> str:
        size = len(s)
        
        # dp table
        table = [[0 for x in range(size)] for y in range(size)]
        
        # base case
        for i in range(size):
            table[i][i] = 1
            if i + 1 < size and s[i] == s[i+1]:
                table[i][i+1] = 2
        
        for j in range(size):
            for i in range(0,j):
                if i + 1 < size and j - 1 < size and s[i] == s[j] and table[i+1][j-1] != 0:
                    table[i][j] = table[i+1][j-1] + 2
        
        max = 0
        ind1, ind2 = 0, 0
        for i in range(size):
            for j in range(i, size):
                if table[i][j] > max:
                    max = table[i][j]
                    ind1 = i
                    ind2 = j

        return s[ind1:ind2+1] 