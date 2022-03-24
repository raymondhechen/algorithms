def hirschberg(seq1, seq2, subst_dict, gap_penalty):
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
    dp_table = [0 for _ in range(len(seq1)+1)] # note that this is just an array now

    # Initialize the dp table with solutions to base cases using linear gap penalty
    for i in range(1, len(seq1)+1):
        dp_table[i] = dp_table[i-1] + gap_penalty

    # Compute the scores row by row
    for i in range(1, len(seq1)+1):
        dp_table_new = [0 for _ in range(len(seq1)+1)] # construct new dp table row
        dp_table_new[0] = dp_table[0] + gap_penalty # first column is just gap penalty iterating
        for j in range(1, len(seq2)+1):
            diag = subst_dict[seq1[i-1] + seq2[j-1]] + dp_table[j-1]
            up = dp_table[j] + gap_penalty
            left = dp_table_new[j-1] + gap_penalty
            dp_table_new[j] = max(diag, up, left)

        dp_table = dp_table_new

    return dp_table[-1]