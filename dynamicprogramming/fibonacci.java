import java.util.*;

/**
 * 
 * Fibonacci Number
 * Find the nth Fibonacci number
 * @author Raymond Chen
 * 
 * Algorithm Design: Dynamic Programming
 * Fibonacci numbers can easily be calculated recursively by defition.
 * F(n) = F(n-1) + F(n-2)
 * However, many of these recursive calls are duplicate calls on the same number, n
 * Thus, we can store these recursive calls and their results dynamically in a DP table.
 * This improves both space and time effiency.
 * 
 * Runtime Analysis:
 * Since we are calculating each recursive call of a number once at most using the 
 * DP table, this is an O(n) solution. We can confirm this by analyzing a recurrence relation
 * T(n) = T(n-1) + c = T(n-2) + 2c = T(n-3) + 3c = T(n-k) + kc
 * We can find a value of k s.t. n - k = 0 --> n = k.
 * Thus, T(n) = T(0) + nc = 1 + nc = O(n)
 */

public class fibonacci {

    public static Map<Integer, Integer> table = new HashMap<Integer, Integer>();

    public static int fib(int n) {
        // Base Case
        if (n < 3) {
            return 1;
        }
        // If recursion has been calculated before already
        if (table.containsKey(n)) {
            return table.get(n);
        }
        else {
            int res = fib(n-1) + fib(n-2);
            table.put(n, res);
            return res;
        }
    }

    public static void main(String[] args) {
        System.out.println(fib(10));
        System.out.println(fib(5));
    }
}