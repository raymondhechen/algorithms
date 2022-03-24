def needleman_wunsch(seq1, seq2, subst_dict, gap_penalty):
    """
    Args:
        seq1 (str): first sequence to be aligned
        seq2 (str): second sequence to be aligned
        subst_dict (dict): substitution matrix stored as a dictionary, with
            keys that reference the two characters being aligned, and values
            being the corresponding score.

        gap_penalty (int): linear gap penalty (penalty per gap character); this
            value should be positive because we will subtract it

    Returns:
        (int): optimal alignment score
    """
    dp_table = [[0] * (len(seq2)+1) for _ in range(len(seq1)+1)]

    # Initialize the dp table with solutions to base cases using linear gap penalty
    for i in range(1, len(seq2)+1):
        dp_table[i][0] = dp_table[i-1][0] + gap_penalty
    for j in range(1, len(seq1)+1):
        dp_table[0][j] = dp_table[0][j-1] + gap_penalty


    # Compute the scores for the rest of the matrix,
    # i.e. all the elements in dp_table[i][j] for i > 0 and j > 0.
    for i in range(1, len(seq2)+1):
        for j in range(1, len(seq1)+1):
            diag = subst_dict[seq1[i-1] + seq2[j-1]] + dp_table[i-1][j-1]
            up = dp_table[i-1][j] + gap_penalty
            left = dp_table[i][j-1] + gap_penalty
            dp_table[i][j] = max(diag, up, left)

    # The optimal score is found at the lower right corner of the dp table:
    return dp_table[-1][-1]