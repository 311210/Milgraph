from igraph import Graph



def read_file_to_string(filename):
    try:
        with open(filename, 'r') as file:
            file_contents = file.read()
            return file_contents
    except Exception as e:
        return f"An error occurred: {str(e)}"

def graph_info(g):
    try:
        info=f"Number of vertices: {g.vcount()} \nNumber of edges: {g.ecount()}\n\n"
        for vertices in g.vs:
            info+=f"{vertices['name']}:    IN-{vertices.indegree()}    OUT-{vertices.outdegree()}\n"
        return info
    except Exception as e:
        return f"An error occurred: {str(e)}"

def graph_vis_v(g):
    try:
    
        igraph_nodes = g.vs

        nodes_data = []
        for node in igraph_nodes:
            node_data = {
                'id': node.index,
                'label': node["name"], 
            }
            nodes_data.append(node_data)

        return nodes_data
    except Exception as e:
        return f"An error occurred: {str(e)}"
def graph_vis_e(g,have_weight):
    try:
        igraph_edges = g.es

        edges_data = []
        for edge in igraph_edges:
            if have_weight:
                edge_data = {
                    "from": edge.source,
                    "to": edge.target,
                    "label": edge['name'],
                }
            else:
                edge_data = {
                    "from": edge.source,
                    "to": edge.target,
                }
            edges_data.append(edge_data)

        return edges_data
    except Exception as e:
        return f"An error occurred: {str(e)}"
def graph_to_adjacency_matrix_string(graph, delimiter, show_labels):
    try:
        if show_labels:
            vertex_names = [vertex['name'] if 'name' in vertex.attributes() else str(i) for i, vertex in
                            enumerate(graph.vs)]
        else:
            vertex_names = None

        adjacency_matrix = graph.get_adjacency().data
        adjacency_matrix_string = ""

        if show_labels:
            adjacency_matrix_string += delimiter.join(vertex_names) + "\n"

        for i, row in enumerate(adjacency_matrix):
            row_str = []
            for j, value in enumerate(row):
                if graph.es.select(_source=i, _target=j):
                    edge = graph.es.select(_source=i, _target=j)[0]
                    weight = edge['name'] if 'name' in edge.attributes() else None
                    if weight is not None:
                        row_str.append(str(weight))
                    else:
                        row_str.append(str(value))
                else:
                    row_str.append(str(value))
            adjacency_matrix_string += delimiter.join(row_str) + "\n"

        return adjacency_matrix_string.strip()
    except Exception as e:
        return f"An error occurred: {str(e)}"


def graph_to_adjacency_list_string(graph, ancestor_separator, separator, weight_separator):
    try:
        adjacency_list = []

        for vertex in range(graph.vcount()):
            neighbors = graph.successors(vertex)
            vertex_name = graph.vs[vertex]['name'] if 'name' in graph.vs[vertex].attributes() else str(vertex)

            neighbors_list = []
            for neighbor in neighbors:
                neighbor_name = graph.vs[neighbor]['name'] if 'name' in graph.vs[neighbor].attributes() else str(
                    neighbor)

                edge = graph.es[graph.get_eid(vertex, neighbor)]
                weight = edge['name'] if 'name' in edge.attributes() else None
                if weight is not None:
                    neighbors_list.append(f"{neighbor_name}{weight_separator}{weight}")
                else:
                    neighbors_list.append(neighbor_name)

            adjacency_list.append(f"{vertex_name}{ancestor_separator}{separator.join(neighbors_list)}")

        adjacency_list_string = "\n".join(adjacency_list)
        return adjacency_list_string
    except Exception as e:
        return f"An error occurred: {str(e)}"


def graph_to_edge_list_string(graph, delimiter, weight_separator):
    try:
        edge_list = []

        for edge in graph.get_edgelist():
            source_name = graph.vs[edge[0]]['name'] if 'name' in graph.vs[edge[0]].attributes() else str(edge[0])
            target_name = graph.vs[edge[1]]['name'] if 'name' in graph.vs[edge[1]].attributes() else str(edge[1])

            weight = graph.es[graph.get_eid(edge[0], edge[1])]['name'] if 'name' in graph.es[
                graph.get_eid(edge[0], edge[1])].attributes() else None

            if weight is not None:
                edge_list.append(f"{source_name}{delimiter}{target_name}{weight_separator}{weight}")
            else:
                edge_list.append(f"{source_name}{delimiter}{target_name}")

        edge_list_string = "\n".join(edge_list)
        return edge_list_string
    except Exception as e:
        return f"An error occurred: {str(e)}"


def create_graph_from_adjacency_matrix(adjacency_str, delimiter, has_labels, directed, weighted):
    try:
        lines = adjacency_str.strip().split('\n')

        if has_labels:
            labels = lines[0].split(delimiter)
            vertex_names = labels
            adjacency_matrix = [row.split(delimiter) for row in lines[1:]]
        else:
            vertex_names = [str(i) for i in range(len(lines))]
            adjacency_matrix = [row.split(delimiter) for row in lines]

        g = Graph(directed=directed)

        for i, name in enumerate(vertex_names):
            g.add_vertex(name=name)

        for i in range(len(adjacency_matrix)):
            for j in range(len(adjacency_matrix[i])):
                weight = adjacency_matrix[i][j]  # Waga jako string
                if weight != '0':
                    g.add_edge(i, j, name=weight)  # Przypisanie atrybutu 'name' jako string

        return g
    except Exception as e:
        return f"An error occurred: {str(e)}"


def create_graph_from_adjacency_list(adjacency_list_str, ancestor_separator, separator, weighted=False,
                                     directed=False, weight_separator=":"):
    try:
        lines = adjacency_list_str.strip().split('\n')

        if weighted:
            g = Graph(directed=directed)
            g.es['weight'] = []
        else:
            g = Graph(directed=directed)

        added_vertices = set() 

        for line in lines:
            parts = line.split(ancestor_separator)
            source = parts[0]
            neighbors = parts[1]
            parts2 = neighbors.split(separator)
            if source not in added_vertices:
                g.add_vertex(name=source)
                added_vertices.add(source)

            for neighbor_str in parts2:
                if weighted:
                    neighbor_parts = neighbor_str.split(weight_separator)
                    neighbor, weight = neighbor_parts[0], float(neighbor_parts[1])
                    if neighbor not in added_vertices:
                        g.add_vertex(name=neighbor)
                        added_vertices.add(neighbor)
                    g.add_edge(source, neighbor, name=str(weight))

                else:
                    neighbor = neighbor_str
                    if neighbor not in added_vertices:
                        g.add_vertex(name=neighbor)
                        added_vertices.add(neighbor)
                    g.add_edge(source, neighbor)

        return g
    except Exception as e:
        return f"An error occurred: {str(e)}"


def create_graph_from_edgelist(edge_list_str, separator, weighted, directed, weight_separator):
    try:
        lines = edge_list_str.strip().split('\n')

        if weighted:

            g = Graph(directed=directed)
            g.es['weight'] = []
            g.es['name'] = []

        else:

            g = Graph(directed=directed)

        added_vertices = set()

        for line in lines:
            if weighted:
                parts = line.split(separator)
                source, target_with_weight = parts[0], parts[1]
                target, weight = target_with_weight.split(weight_separator)
            else:
                parts = line.split(separator)
                source, target = parts[0], parts[1]

            if source not in added_vertices:
                g.add_vertex(name=source)
                added_vertices.add(source)

            if target not in added_vertices:
                g.add_vertex(name=target)
                added_vertices.add(target)

            if weighted:
                g.add_edge(source, target, name=str(weight))
            else:
                g.add_edge(source, target)

        return g
    except Exception as e:

        
        return f"An error occurred: {str(e)}"




def graph_to_python_edge_list_string(graph):
    try:
        edge_list = [(graph.vs[edge.source]["name"], graph.vs[edge.target]["name"]) for edge in graph.es]


        weights = graph.es["name"] if "name" in graph.es.attributes() else [None] * len(edge_list)


        edge_list_string = "Graph = ["
        for edge, weight in zip(edge_list, weights):
            if weight is not None:
                edge_str = f"('{edge[0]}', '{edge[1]}', {weight}), "
            else:
                edge_str = f"('{edge[0]}', '{edge[1]}'), "
            edge_list_string += edge_str


        edge_list_string = edge_list_string.rstrip(", ") + "]"

        return edge_list_string
    except Exception as e:
        return f"An error occurred: {str(e)}"

def graph_to_java_edge_list_string(graph):
    try:

        edge_list = [(graph.vs[edge.source]["name"], graph.vs[edge.target]["name"]) for edge in graph.es]
        weights = graph.es["name"] if "name" in graph.es.attributes() else [None] * len(edge_list)


        edge_list_string = "String[][] Graph = {"

        for edge, weight in zip(edge_list, weights):
            if weight is not None:
                edge_str = f"{{\"{edge[0]}\", \"{edge[1]}\", \"{weight}\"}}, "
            else:
                edge_str = f"{{\"{edge[0]}\", \"{edge[1]}\"}}, "
            edge_list_string += edge_str

        edge_list_string = edge_list_string.rstrip(", ") + "};"

        return edge_list_string
    except Exception as e:
        return f"An error occurred: {str(e)}"


def graph_to_python_adjacency_list_string(graph):
    try:
        adjacency_list = {}
        
        for vertex in graph.vs:
            vertex_name = vertex["name"] # Tutaj używamy indeksu wierzchołka jako nazwy
            neighbors = []
            for neighbor in vertex.neighbors():
                neighbor_name = neighbor["name"]  # Tutaj używamy indeksu sąsiada jako nazwy
                is_connected = False
                for edge in graph.es.select(_source=vertex.index, _target=neighbor):
                    weight = edge["name"] if "name" in edge.attributes() else None
                    if weight is not None:
                        neighbors.append((neighbor_name, weight))
                    else:
                        neighbors.append(neighbor_name)
                    is_connected = True
                if not is_connected:
                    neighbors.append(neighbor_name)
            adjacency_list[vertex_name] = neighbors

        adjacency_list_string = str(adjacency_list)
        return adjacency_list_string
    except Exception as e:
        return f"An error occurred: {str(e)}"


    
def graph_to_python_adjacency_matrix_string(graph):
    try:
        adjacency_matrix = graph.get_adjacency().data
        adjacency_matrix_string = "Graph = ["

        for row in adjacency_matrix:
            row_string = ", ".join(map(str, row))
            adjacency_matrix_string += "[" + row_string + "], "

        adjacency_matrix_string = adjacency_matrix_string.rstrip(", ") + "]"
        return adjacency_matrix_string
    except Exception as e:
        return f"An error occurred: {str(e)}"
    
def graph_to_java_adjacency_matrix_string(graph):
    try:
        adjacency_matrix = graph.get_adjacency().data
        adjacency_matrix_string = "int[][] Graph = {"

        for row in adjacency_matrix:
            row_string = ', '.join(map(str, row))
            adjacency_matrix_string += "{" + row_string + "}, "

        adjacency_matrix_string = adjacency_matrix_string.rstrip(", ") + "};"
        return adjacency_matrix_string
    except Exception as e:
        return f"An error occurred: {str(e)}"