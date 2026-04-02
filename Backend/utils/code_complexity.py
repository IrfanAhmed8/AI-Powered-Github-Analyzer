def code_complexity(no_lines_of_code):
    if no_lines_of_code < 100:
        return "Low"
    elif no_lines_of_code < 500:
        return "Medium"
    else:
        return "High"
    
def file_complexity(line_count):
    if line_count < 50:
        return "small_files"
    elif line_count < 200:
        return "Medium_files"
    else:
        return "large_files"

    
