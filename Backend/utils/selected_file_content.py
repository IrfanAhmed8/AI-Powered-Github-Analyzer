import os
def selected_file_content(repo_path, selected_files):
    content = {}
    for file in selected_files:
        file_path = os.path.join(repo_path, file)
        if os.path.isfile(file_path):
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content[file] = f.read()
    return content