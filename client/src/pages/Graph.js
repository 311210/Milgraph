import React, { useEffect } from 'react';
import vis from 'vis';

function Graph({ graphData, graphOptions }) {
  useEffect(() => {

    const data = {
      nodes: new vis.DataSet(graphData.nodes),
      edges: new vis.DataSet(graphData.edges),
    };


    const options = graphOptions || {}; 


    const container = document.getElementById('graph-container');
    const network = new vis.Network(container, data, options);
  }, [graphData, graphOptions]); 

  return (
    <div>
      <div id="graph-container" style={{ 
                                        marginTop: '10px',
                                        width: '100%', 
                                        height: '800px',
                                        border: '1px solid orange', 
                                        borderRadius: '5px',
                                        }}>
                                        </div>
    </div>
  );
}

export default Graph;