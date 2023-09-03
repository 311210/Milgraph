
from flask_cors import CORS
from flask import Flask, request, jsonify
import json
from graph_conversion import graph_info, graph_to_java_edge_list_string, graph_to_java_adjacency_matrix_string, graph_to_python_adjacency_list_string,graph_to_python_adjacency_matrix_string,graph_to_python_edge_list_string,graph_to_java_edge_list_string, graph_vis_v,graph_vis_e,create_graph_from_edgelist, create_graph_from_adjacency_list, create_graph_from_adjacency_matrix,graph_to_adjacency_list_string,graph_to_adjacency_matrix_string,graph_to_edge_list_string


app = Flask(__name__)
CORS(app)
@app.route('/convert', methods=['POST'])
def handle_conversion():
    try:
        data = request.json
        
        if data.get('selectedOption') == 'edgeList':
            g = create_graph_from_edgelist(data.get('input'),data.get('separator'),data.get('weighted'),data.get('directed'),data.get('weightSeparator'))
            print(data.get('weightSeparator'))

            
        elif data.get('selectedOption') == 'adjacencyMatrix':
            g = create_graph_from_adjacency_matrix(data.get('input'),data.get('separator'),data.get('showVertexName'),data.get('directed'),data.get('weighted'))
        
        elif data.get('selectedOption') == 'adjacencyList':
            g = create_graph_from_adjacency_list(data.get('input'),data.get('ancestorSeparator'),data.get('separator'),data.get('weighted'),data.get('directed'),data.get('weightSeparator'))
        
        if data.get('selectedOptionOutput') == 'edgeListOutput':
            
            output = graph_to_edge_list_string(g,data.get('separatorOutput'),data.get('weightSeparator'))
        
        elif data.get('selectedOptionOutput') == 'adjacencyMatrixOutput':
            output = graph_to_adjacency_matrix_string(g,data.get('separatorOutput'),data.get('showVertexNameOutput'))
            print(output)
        
        elif data.get('selectedOptionOutput') == 'adjacencyListOutput':
            output = graph_to_adjacency_list_string(g,data.get('ancestorSeparatorOutput'),data.get('separatorOutput'),data.get('weightSeparator'))

        elif data.get('selectedOptionOutput') == 'javaEdgeListOutput':
            output = graph_to_java_edge_list_string(g)

        elif data.get('selectedOptionOutput') == 'pythonEdgeListOutput':
            output = graph_to_python_edge_list_string(g)


        elif data.get('selectedOptionOutput') == 'pythonAdjacencyListOutput':
            output = graph_to_python_adjacency_list_string(g)

        elif data.get('selectedOptionOutput') == 'javaAdjacencyMatrixOutput':
            output = graph_to_java_adjacency_matrix_string(g)

        elif data.get('selectedOptionOutput') == 'pythonAdjacencyMatrixOutput':
            output = graph_to_python_adjacency_matrix_string(g)

        info=graph_info

        to_front = {
            'info': info,
            'output': output,
        }

        return jsonify(to_front)
    except Exception as e:
        print("Error:", e)  
        return jsonify({'error': str(e)})
@app.route('/visualization', methods=['POST'])
def handle_visualization():
    try:
        data = request.json
        
        if data.get('selectedOption') == 'edgeList':
            g = create_graph_from_edgelist(data.get('input'),data.get('separator'),data.get('weighted'),data.get('directed'),data.get('weightSeparator'))
            print(data.get('weightSeparator'))

            
        elif data.get('selectedOption') == 'adjacencyMatrix':
            g = create_graph_from_adjacency_matrix(data.get('input'),data.get('separator'),data.get('showVertexName'),data.get('directed'),data.get('weighted'))
        
        elif data.get('selectedOption') == 'adjacencyList':
            g = create_graph_from_adjacency_list(data.get('input'),data.get('ancestorSeparator'),data.get('separator'),data.get('weighted'),data.get('directed'),data.get('weightSeparator'))
        
        
        v = graph_vis_v(g)
        e = graph_vis_e(g,data.get('weighted'))

        return jsonify({'nodes': v, 'edges': e})
    except Exception as e:
        print("Error:", e)  
        return jsonify({'error': str(e)})
if __name__ == '__main__':
    app.run(debug=True)