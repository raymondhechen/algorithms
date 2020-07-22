# You are given two non-empty linked lists representing two non-negative integers. 
# The digits are stored in reverse order and each of their nodes contain a single digit. 
# Add the two numbers and return it as a linked list.
# You may assume the two numbers do not contain any leading zero, except the number 0 itself.

# Example:
# Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
# Output: 7 -> 0 -> 8
# Explanation: 342 + 465 = 807.

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
    a = ""
    b = ""
    while l1 != None:
        a = str(l1.val) + a
        l1 = l1.next
    while l2 != None:
        b = str(l2.val) + b
        l2 = l2.next

    res = str(int(a) + int(b))

    for i in range(len(res)):
        if i == 0:
            n1 = ListNode(int(res[i]), None)
            n2 = ListNode(int(res[i+1]), n1)
        if i == 1:
            continue
        else:
            n2 = ListNode(int(res[i]), n1)
        n1 = n2

    return n2






        