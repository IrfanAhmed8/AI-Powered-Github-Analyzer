def language_percentage(lines_count_with_extensions,total_no_lines_of_code):
    language_percentages = {}
    for ext,count in lines_count_with_extensions.items():
        if total_no_lines_of_code > 0:
            if count > 0:
                language_percentages[ext]= round((count/total_no_lines_of_code)*100,2)
    return language_percentages


def main_language(language_percentages):
    if language_percentages:
        main_lang = max(language_percentages, key=language_percentages.get)
        return main_lang
    return None

def map_extension_to_language(extension):
    mapping = {
        ".py": "Python",
        ".js": "JavaScript",
        ".java": "Java",
        ".jsx": "JavaScript (JSX)",
        ".cpp": "C++",
        ".c": "C",
        ".rb": "Ruby",
        ".go": "Go",
        ".ts": "TypeScript",
        ".md": "Markdown",
        ".css": "CSS",
        ".html": "HTML"
    }
    return mapping.get(extension, "Unknown")