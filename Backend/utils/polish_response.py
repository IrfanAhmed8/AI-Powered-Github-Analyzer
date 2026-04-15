def polish_response(response):
    #get summary of the response where starts "summary\" and ends with "architecture\"
    summary_start = response.find('"summary":') + len('"summary":')
    summary_end = response.find('"architecture":')
    #remove \"," from the end of the  summary
    summary=response[summary_start:summary_end].strip().strip('"').rstrip(',').rstrip('"')

    #get architecture of the response where starts "architecture\" and ends with "features\"
    architecture_start = response.find('"architecture":') + len('"architecture":')
    architecture_end = response.find('"features":')
    architecture = response[architecture_start:architecture_end].strip().strip('"').rstrip(',').rstrip('"')
    #get features of the response where starts "features\" and ends with the last }
    features_start = response.find('"features":') + len('"features":')
    features_end = response.rfind('}')
    features = response[features_start:features_end].strip().strip('[]').split(',')
    features = [feature.strip().strip('"') for feature in features]
    return {
        "summary": summary,
        "architecture": architecture,
        "features": features
    }