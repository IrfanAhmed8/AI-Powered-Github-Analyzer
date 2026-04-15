import os
import json
from utils.language_utils import language_percentage, main_language,map_extension_to_language
from utils.code_complexity import code_complexity,file_complexity
from utils.project_type_utils import detect_project_type, project_dependencies



def directory_traverse(path):
    #list all files and directories in the given path
    items = []
    files_count_with_extensions = {".py": 0, ".js": 0, ".java": 0, ".jsx": 0, ".cpp": 0, ".c": 0, ".rb": 0, ".go": 0, ".ts": 0,".md": 0,".css": 0,".html": 0 }
    line_count_with_extensions = {".py": 0, ".js": 0, ".java": 0, ".jsx": 0, ".cpp": 0, ".c": 0, ".rb": 0, ".go": 0, ".ts": 0,".md": 0,".css": 0,".html": 0 ,"other": 0}
    total_files = 0
    total_no_lines_of_code=0
    ignore_dirs = {".git", "node_modules", "venv", "__pycache__"}
    file_complexity_levels = {"small_files": 0, "Medium_files": 0, "large_files": 0}
    for root, dirs, files in os.walk(path):
        dirs[:] = [d for d in dirs if d not in ignore_dirs]
        for name in files:
            ext = os.path.splitext(name)[1]
            total_files += 1
            if ext in files_count_with_extensions:
                total_no_lines_of_code+=sum(1 for line in open(os.path.join(root, name), 'r', encoding='utf-8', errors='ignore'))
                files_count_with_extensions[ext] += 1
                line_count_for_current_file = sum(1 for line in open(os.path.join(root, name), 'r', encoding='utf-8', errors='ignore'))
                complexity_level = file_complexity(line_count_for_current_file)
                file_complexity_levels[complexity_level] += 1
                if ext in line_count_with_extensions:
                    line_count_with_extensions[ext]+=line_count_for_current_file

                else:
                    line_count_with_extensions["other"]+=line_count_for_current_file
            relative_path= os.path.relpath(os.path.join(root,name),path)
            items.append(relative_path)
    
    language_percentages = language_percentage(line_count_with_extensions, total_no_lines_of_code)
    language_percentages = {map_extension_to_language(ext): perc for ext, perc in language_percentages.items()}
    main_lang = main_language(language_percentages)
    code_complexity_level = code_complexity(total_no_lines_of_code)
    project_dependency=project_dependencies(path, items)
    project_type=detect_project_type(items, project_dependency)
    return {
        "files": items,
        "extensions": files_count_with_extensions,
        "total_files": total_files,
        "total_lines": total_no_lines_of_code,
        "language_percentages": language_percentages,
        "main_language": main_lang,
        "code_complexity": code_complexity_level,
        "line_count_with_extensions": line_count_with_extensions,
        "project_dependencies": project_dependency,
        "project_type": project_type,
        "complexity": file_complexity_levels
    }