class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if len(s) < numRows or numRows == 1:
            return s
        
        table = []
        for i in range(numRows):
            table.append("")
        
        rowCounter = 0
        increase = True
        for i in range(len(s)):
            table[rowCounter] += s[i]
            
            if increase:
                rowCounter += 1
            else:
                rowCounter -= 1
                
            if rowCounter == numRows - 1:
                increase = False
            if rowCounter == 0:
                increase = True
        
        return ''.join(table)