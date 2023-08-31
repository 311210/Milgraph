
  import React from 'react';
  import  Graph  from 'react-graph-vis';
  import "../styles.css";
  import undirected from './undirected.png'
  import directed from './directed.png'
  import weight from './weight.png'
  import edgelist from './edge list.png'
  import adjacenecylist from './adjacency list.png'
  import adjacenecymatrix from './adjacency matrix.png'
  
  function What() {
    
  
    return (
      
      <div>
        <h1>A Graph is a non-linear data structure consisting of vertices and edges.
        The vertices are sometimes also referred to as nodes and the edges are lines or arcs that connect any two nodes in the graph.
        More formally a Graph&nbsp;is composed of a set of vertices(&nbsp;<strong>V&nbsp;</strong>) and a set of edges(&nbsp;<strong>E&nbsp;</strong>). 
        The graph is denoted by&nbsp;<strong>G(V, E).</strong> Graph data structures are a powerful tool for representing and analyzing complex relationships between objects or entities.
        They are particularly useful in fields such as social network analysis, recommendation systems, and computer networks.</h1>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        <h2>Types of Graph</h2>
        &nbsp;
        &nbsp;
        &nbsp;
        <h1>Undirected</h1>
      <div class="flex-container">
      <div class="text">
        <h1>A graph in which edges do not have any direction. That is the nodes are unordered pairs in the definition of every edge.</h1>
      </div>
      <div class="image">
        <img src={undirected}/>
      </div>
      </div>

      <h1>Directed</h1>
      <div class="flex-container">
      <div class="text">
        <h1>A graph in which edge has direction. That is the nodes are ordered pairs in the definition of every edge.</h1>
      </div>
      <div class="image">
        <img src={directed}/>
      </div>
      </div>

      <h1>Weighted Graph</h1>
      <div class="flex-container">
      <div class="text">
        <h1>A graph in which the edges are already specified with suitable weight is known as a weighted graph. 
          Weighted graphs can be further classified as directed weighted graphs and undirected weighted graphs.</h1>
      </div>
      <div class="image">
        <img src={weight}/>
      </div>
      </div>
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      <h2>Representation of Graph</h2>
      &nbsp;
      &nbsp;
      &nbsp;
      
      <h1>Adjacency Matrix</h1>
      <div class="flex-container">
      <div class="text">
        <h1>In this method, the graph is stored in the form of the 2D matrix where rows and columns denote vertices.
           Each entry in the matrix represents the weight of the edge between those vertices.</h1>
      </div>
      <div class="image">
        <img src={adjacenecymatrix}/>
      </div>
      </div>

      <h1>Adjacency List</h1>
      <div class="flex-container">
      <div class="text">
        <h1>This graph is represented as a collection of linked lists. There is an array of pointer which points to the edges connected to that vertex.</h1>
      </div>
      <div class="image">
        <img src={adjacenecylist}/>
      </div>
      </div>

      <h1>Edge List</h1>
      <div class="flex-container">
      <div class="text">
        <h1>Graph is represented as a pair of two verticies. In directed edge list, pair is oriented as a ancestor and succesor.</h1>
      </div>
      <div class="image">
        <img src={edgelist}/>
      </div>
      </div>


      </div>














    );
  }
  export default What;