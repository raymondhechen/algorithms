def smith_waterman(seq1, seq2, subst_dict, gap_penalty):
    """
    Args:
        seq1 (str): first sequence to match
        seq2 (str): second sequence to match
        subst_dict (dictionary string -> int): dictionary
            representation of the substitution matrix
        gap_penalty (int): gap penalty (penalty per gap character);
            this value should be positive because we will subtract it

    A max score may be in multiple locations, so return the optimal
    score, the locations of all the maxima, and any one optimal
    alignment as a tuple.

    Returns a tuple of:
        (the optimal alignment score as an int,

         the locations of the maxima in the dp table as a list of
         tuples. these positions will include the offset of the
         initialized penalty row and column, so that location (i,j)
         refers to the i-prefix of X and the j-prefix of Y, just as in
         lecture,

         tuple for an optimal alignment)      
    """
    dp = [[0] * (len(seq2)+1) for _ in range(len(seq1)+1)]

    # calculate dp table
    for i in range(1, len(dp)):
        for j in range(1, len(dp[0])):
            diag = subst_dict[seq1[i-1] + seq2[j-1]] + dp[i-1][j-1]
            up = dp[i-1][j] + gap_penalty
            left = dp[i][j-1] + gap_penalty
            dp[i][j] = max(diag, up, left, 0) # minimum value is always 0

    # find global maxima
    maxima_loc = []
    maxima = 0
    for i in range(len(dp)):
        for j in range(len(dp[0])):
            if dp[i][j] > maxima:
                maxima_loc = [(i, j)]
                maxima = dp[i][j]
            elif dp[i][j] == maxima:
                maxima_loc.append((i, j))

    # traceback
    start_loc = maxima_loc[0]
    seq1_align = ""
    seq2_align = ""
    i = start_loc[0]
    j = start_loc[1]
    while dp[i][j] != 0:
        # left
        if j > 0 and dp[i][j-1] + gap_penalty == dp[i][j]:
            seq1_align = "-" + seq1_align
            seq2_align = seq2[j-1] + seq2_align
            j -= 1
        elif i > 0 and j > 0 and dp[i-1][j-1] + subst_dict[seq1[i-1] + seq2[j-1]] == dp[i][j]:
            seq1_align = seq1[i-1] + seq1_align
            seq2_align = seq2[j-1] + seq2_align
            j -= 1
            i -= 1
        else: 
            seq1_align = seq1[i-1] + seq1_align
            seq2_align = "-" + seq2_align
            i -= 1

    alignment = (seq1_align, seq2_align, start_loc[0]+1, i+1, start_loc[1]+1, j+1)
    return (maxima, len(maxima_loc), maxima_loc, alignment)