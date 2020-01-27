public class mergesort {

    // Recursively called merge sort function
    public static int[] mergeSort(int[] a) {
        // Base Case: length < 2 (nothing to sort)
        if (a.length < 2) {
            return a;
        }

        // Partition a into b, c
        int[] b = new int[a.length / 2];
        int[] c = new int[a.length - (a.length / 2)];
        int j = 0, k = 0; // counting vars for b, c
        for (int i = 0; i < a.length; i++) {
            if (i < a.length / 2) {
                b[j] = a[i];
                j++;
            }
            else {
                c[k] = a[i];
                k++;
            }
        }

        // Recursively call mergeSort on b, c
        b = mergeSort(b);
        c = mergeSort(c); 

        // Merge two sorted subarrays
        return merge(b, c);
    }

    // Merge two sorted subarrays
    public static int[] merge(int[] b, int[] c) {
        int[] a = new int[b.length + c.length]; 
        int i = 0, j = 0, k = 0;
        while (i < b.length || j < c.length) {
            if (i == b.length) { // if b finished, but not c
                a[k] = c[j];
                k++;
                j++;
            }
            else if (j == c.length) {
                a[k] = b[i];
                k++;
                i++;
            }
            else if (b[i] < c[j]) {
                a[k] = b[i];
                k++;
                i++;
            }
            else {
                a[k] = c[j];
                k++;
                j++;
            }
        }
        return a;
    }

    // Utility function: Print array
    public static void printArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
    }
    
    public static void main(String[] args) {
        int[] a1 = {6, 2, 4, 1 , 5, 3 , 7, 8};
        printArray(mergeSort(a1));
    }
}