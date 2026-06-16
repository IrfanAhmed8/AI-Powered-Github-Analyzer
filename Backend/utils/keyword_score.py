def keyword_score(query, text):
    score = 0
    import re

    query_words = re.findall(
        r"\w+",
        query.lower()
    )
    for word in query_words:
        if word in text.lower():
            score += 1

    return score