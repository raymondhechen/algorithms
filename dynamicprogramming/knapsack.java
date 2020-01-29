/**
 * 
 * Knapsack Problem
 * There is a knapsack that can hold items of total weight at most w.
 * There are also n items with weights w1, w2,..., wn.
 * Each item also has value v1, v2,..., vn.
 * Goal: select some items to put into the knapsack such that:
 * 1. Total weight is at most w
 * 2. Total value is as large as possible
 * @author Raymond Chen
 * 
 * Algorithm Design: Dynamic Programming
 * We will think of the problem as making a sequence of decisions, 
 * such that for each item, we will decide whether we put it into the knapsack or not.
 * We will focus specifically on the last item/decisions: we will either put it in or leave it out.
 * We will then look at the subproblem by filling the remaining capacity using the remaining items.
 * If we leave it out, # items is smaller. If we put it in, both capacity and # items are smaller.
 * 
 * Ex. w = 4, 3 items (w, v) = (1,2), (2,3), (3,4)
 * Subproblem: What is max value for knapsack with capacity j = (0,1,2,3,4)
 * and first i = (0,1,2,3) items?
 * a[i, j] = max(a[i-1, j - wi] + vi, a[i-1, j]) 
 * a[i, j] = max(item i in knapsack, item i not in knapsack)
 * 
 * Runtime Analysis:
 * 
 * 
 */

public class knapsack {
    
    public static void knapsack() {
        
    }

    public static void main(String[] args) {

    }
}