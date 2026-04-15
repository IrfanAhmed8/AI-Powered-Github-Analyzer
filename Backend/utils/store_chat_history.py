import json
import os   
def store_chat_history(repo_name, user_query, response):
    #store only last 5 interactions in a json file with repo name as file name and store in chat_history folder
    chat_history_file = f"chat_history/{repo_name}.json"
    if os.path.exists(chat_history_file):
        with open(chat_history_file, "r") as f:
            chat_history = json.load(f)
    else:
        chat_history = []   
    chat_history.append({"user_query": user_query, "response": response})
    if len(chat_history) > 5:
        chat_history = chat_history[-5:]
    with open(chat_history_file, "w") as f:
        json.dump(chat_history, f, indent=4)    
