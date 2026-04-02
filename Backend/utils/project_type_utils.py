import os
import json

def detect_project_type(files, dependencies):
    is_frontend = False
    is_backend = False

    # flatten dependency names
    dep_names = set()

    for file, data in dependencies.items():
        if isinstance(data, dict):
            dep_names.update(data.get("dependencies", {}).keys())
        elif isinstance(data, list):
            dep_names.update([d.split("==")[0] for d in data])

    # 🔹 frontend detection
    frontend_keywords = {"react", "next", "vue", "angular"}
    if dep_names & frontend_keywords:
        is_frontend = True

    if any("public/" in f or "src/" in f for f in files):
        is_frontend = True

    # 🔹 backend detection
    backend_keywords = {"express", "fastapi", "django", "flask"}
    if dep_names & backend_keywords:
        is_backend = True

    if any(f.endswith(".py") or "server/" in f for f in files):
        is_backend = True

    # 🔹 final classification
    if is_frontend and is_backend:
        return "Full Stack"
    elif is_frontend:
        return "Frontend"
    elif is_backend:
        return "Backend"
    else:
        return "Unknown" 


def project_dependencies(repo_path, file_list):
    dependencies = {}

    for file in file_list:
        full_path = os.path.join(repo_path, file)
        if file.endswith("package.json"):
            with open(full_path, "r", encoding="utf-8") as f:
                data = json.load(f)

                dependencies[file] = {
                    "dependencies": data.get("dependencies", {}),
                    "devDependencies": data.get("devDependencies", {})
                }

        elif file.endswith("requirements.txt"):
            deps = []
            with open(full_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#"):
                        deps.append(line)

            dependencies[file] = deps

        #later: Gemfile, go.mod, etc

    return dependencies