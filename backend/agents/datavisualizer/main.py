from my_agent.WorkflowManager import WorkflowManager
import json
import pandas as pd

def generate_visualization(data):
    # Parse the input data
    try:
        parsed_data = json.loads(data)
    except json.JSONDecodeError:
        # If not JSON, try parsing as CSV
        parsed_data = pd.read_csv(pd.compat.StringIO(data)).to_dict(orient='records')
    
    # Analyze the data to determine the best chart type
    if isinstance(parsed_data, list) and len(parsed_data) > 0:
        if len(parsed_data) > 10:
            chart_type = 'line'
        else:
            chart_type = 'bar'
    else:
        chart_type = 'bar'  # Default to bar chart
    
    # Format the data for the chart
    chart_data = [{"name": str(k), "value": v} for k, v in parsed_data.items()] if isinstance(parsed_data, dict) else parsed_data
    
    return {
        "chartType": chart_type,
        "chartData": chart_data
    }

# Update the WorkflowManager to include the visualization function
class CustomWorkflowManager(WorkflowManager):
    def __init__(self):
        super().__init__()
        self.add_node("generate_visualization", generate_visualization)

# for deployment on langgraph cloud
graph = CustomWorkflowManager().returnGraph()
