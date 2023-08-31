from igraph import Graph



def read_file_to_string(filename):
    try:
        with open(filename, 'r') as file:
            file_contents = file.read()
            return file_contents
    except Exception as e:
        return f"An error occurred: {str(e)}"


def graph_vis_v(g):
    igraph_nodes = g.vs

    nodes_data = []
    for node in igraph_nodes:
        node_data = {
            'id': node.index,
            'label': node["name"], 
        }
        nodes_data.append(node_data)

    return nodes_data

def graph_vis_e(g,have_weight):
    igraph_edges = g.es

    edges_data = []
    for edge in igraph_edges:
        if have_weight:
            edge_data = {
                "from": edge.source,
                "to": edge.target,
                "label": str(edge['weight']),
            }
        else:
            edge_data = {
                "from": edge.source,
                "to": edge.target,
            }
        edges_data.append(edge_data)

    return edges_data

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
            adjacency_matrix_string += delimiter + delimiter.join(vertex_names) + "\n"

        for i, row in enumerate(adjacency_matrix):
            row_str = []
            for j, value in enumerate(row):
                if graph.es.select(_source=i, _target=j):
                    edge = graph.es.select(_source=i, _target=j)[0]
                    weight = edge['weight'] if 'weight' in edge.attributes() else None
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
                weight = edge['weight'] if 'weight' in edge.attributes() else None
                if weight is not None:
                    neighbors_list.append(f"{neighbor_name}{weight_separator}{weight}")
                else:
                    neighbors_list.append(neighbor_name)

            adjacency_list.append(f"{vertex_name} {ancestor_separator} {separator.join(neighbors_list)}")

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

            weight = graph.es[graph.get_eid(edge[0], edge[1])]['weight'] if 'weight' in graph.es[
                graph.get_eid(edge[0], edge[1])].attributes() else None

            if weight is not None:
                edge_list.append(f"{source_name} {delimiter} {target_name} {weight_separator} {weight}")
            else:
                edge_list.append(f"{source_name} {delimiter} {target_name}")

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
            adjacency_matrix = [list(map(int, row.split(delimiter))) for row in lines[1:]]
        else:
            vertex_names = [str(i) for i in range(len(lines))]
            adjacency_matrix = [list(map(int, row.split(delimiter))) for row in lines]

        if weighted:
            g = Graph.Weighted_Adjacency(adjacency_matrix, mode="DIRECTED" if directed else "UNDIRECTED")
        else:
            g = Graph.Adjacency(adjacency_matrix, mode="DIRECTED" if directed else "UNDIRECTED")

        for i, name in enumerate(vertex_names):
            g.vs[i]['name'] = name

        return g
    except Exception as e:
        return f"An error occurred: {str(e)}"


def create_graph_from_adjacency_list(adjacency_list_str, ancestor_separator="", separator=",", weighted=False,
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
                    g.add_edge(source, neighbor, weight=weight)

                else:
                    neighbor = neighbor_str
                    if neighbor not in added_vertices:
                        g.add_vertex(name=neighbor)
                        added_vertices.add(neighbor)
                    g.add_edge(source, neighbor)

        return g
    except Exception as e:
        return f"An error occurred: {str(e)}"


def create_graph_from_edgelist(edge_list_str, separator=",", weighted=False, directed=False, weight_separator=":"):
    try:
        lines = edge_list_str.strip().split('\n')

        if weighted:

            g = Graph(directed=directed)
            g.es['weight'] = []

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
                g.add_edge(source, target, weight=float(weight))
            else:
                g.add_edge(source, target)

        return g
    except Exception as e:

        print("An error occurred:", target_with_weight.split(weight_separator))
        return f"An error occurred: {str(e)}"


