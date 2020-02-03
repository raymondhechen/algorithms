/**
 * 
 * Knapsack Problem
 * There is a knapsack that can hold items of total weight at most w.
 * There are also n items with weights w1, w2,..., wn.
 * Each item also has value v1, v2,..., vn.
 * Goal: select some items to put into the knapsack such that:
 * 1. Total weight is at most w
 * 2. Total value is as large as possible
 * Return the maximum possible value
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
    
    // Non-DP approach
    public static int knap(int w, int n, int[] val, int[] wt) {
        // Base case: If no items or capacity is 0, max is 0
        if (n == 0 || w == 0) {
            return 0;
        }
        // If weight of nth item > knapsack capacity, cannot be included 
        else if (wt[n-1] > w) {
            return knap(w, n-1, val, wt);
        }
        // Else return transition function: max of not including and including item n
        else {
            return max(knap(w, n-1, val, wt), val[n-1] + knap(w - wt[n-1], n-1, val, wt));
        }

    }

    // DP approach
    public static int[][] table;

    public static int knapDP(int w, int n, int[] val, int[] wt) {
        // Initialize DP table
        table = new int[n][w];
        for (int i = 0; i < n; i++) {
            table[i][0] = 0;
        }
        for (int i = 0; i < w; i++) {
            table[0][i] = 0;
        }

        // Fill out table
        for (int i = 1; i < n; i++) {
            for (int j = 1; j < w; j++) {
                table[i][j] = table[i-1][j];
                if (j > wt[i] && table[i-1][j-wt[i]] + val[i] > table[i][j]) {
                    table[i][j] = table[i-1][j-wt[i] + val[i]];
                }
            }
        }

        // Return result
        if (n == 0 || w == 0) {
            return 0;
        }
        if (table[n][w] == table[n-1][w]) {
            return table[n-1][w];
        }
        else {
            
        }
    }

    // Utility function to find max of two integers
    public static int max(int a, int b) {
        if (a >= b) {
            return a;
        }
        return b;
    }

    public static void main(String[] args) {
        int val[] = new int[]{60, 100, 120};
        int wt[] = new int[]{10, 20, 30};
        int w = 50;
        int n = val.length;
        System.out.println(knap(w, n, val, wt));
        System.out.println(knapDP(w, n, val, wt));
    }
}