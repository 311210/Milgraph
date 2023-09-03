import React, { useEffect, useState } from 'react';
import { Button, MenuItem, Select, TextField, InputLabel, FormControl,ThemeProvider} from '@mui/material';
import Graph from './Graph';
import "../styles.css";
import theme from './theme';
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import html2canvas from 'html2canvas';
export default function Visualization() {
    const [selectedOption, setSelectedOption] = useState('');
    const [separator, setSeparator] = useState(',');
    const [ancestorSeparator, setancestorSeparator] = useState('->');
    const [weightSeparator, setweightSeparator] = useState(':');
    const [showVertexName, setShowVertexName] = useState(false);
    const [weighted, setWeighted] = useState(false);
    const [directed, setDirected] = useState(false);
    const [input, setInput] = useState('');
    const [graphData, setgraphData] = useState({ nodes: [], edges: [] });
    const [showGraph, setShowGraph] = useState(false);
    const [imgUrl, setImgUrl] = useState(null); // Nowy stan do przechowywania URL obrazu
    const location =useLocation();
    const options = {
      physics: {

        centralGravity: 0,
      },
      layout: {
        hierarchical: false,

      },
      edges: {
        
        color: '#fff',
        width: 3,
        arrows: {
          to: directed
        },
      },
      nodes: {
        color: '#ffa424',
        font: {
          size: 24,
        },
      },
    };

    const handleOptionChange = (event) => {
      const selectedOption = event.target.value;
      setSelectedOption(selectedOption);
    };
  
    const handleSeparatorChange = (event) => {
      const separator = event.target.value;
      setSeparator(separator);
    };
    const handleweightSeparatorChange = (event) => {
      const weightSeparator = event.target.value;
      setweightSeparator(weightSeparator);
    };
    const handleancestorSeparatorChange = (event) => {
      const ancestorSeparator = event.target.value;
      setancestorSeparator(ancestorSeparator);
    };
    


    const handleInputChange = (event) => {
      const input = event.target.value;
      setInput(input);
    };
  
    const handleShowVertexNameChange = () => {
      setShowVertexName(!showVertexName);
    };



    
  
    const handleWeightedChange = () => {
      setWeighted(!weighted);
    };
  
    const handleDirectedChange = () => {
      setDirected(!directed);
    };

    const handleSubmit = async () => {

      const requestData = {
        selectedOption:selectedOption,
        separator:separator,
        weightSeparator:weightSeparator,
        ancestorSeparator:ancestorSeparator,
        showVertexName:showVertexName,
        weighted:weighted,
        directed:directed,
        input:input,
      };
      
      try {
        const response = await axios.post('/visualization', requestData);
        console.log(response);
        setgraphData(response.data);
        setShowGraph(true);
      } catch (error) {
        console.error('Error sending data to Flask:', error);
      }

    };
    useEffect(() => {
      if(location && location.state){
          setSelectedOption(location.state.selectedOption)
          setSeparator( location.state.separator)
          setweightSeparator(location.state.weightSeparator)
          setancestorSeparator(location.state.ancestorSeparator)
          setShowVertexName(location.state.showVertexName)
          setWeighted(location.state.weighted)
          setDirected(location.state.directed)
          setInput(location.state.input)

      }
      }, []);
      const handleCaptureImage = () => {
        const elementToCapture = document.getElementById('elementToCapture');
    
        html2canvas(elementToCapture).then(function (canvas) {
          const imageUrl = canvas.toDataURL('image/jpeg');
    
          // Ustaw wynikową URL obrazu w stanie komponentu
          setImgUrl(imageUrl);
          const a = document.createElement('a');
          a.href = imageUrl;
          a.download = 'przechwycony_obraz.jpg';
          a.click();
        });
      };
    return (
      <ThemeProvider theme={theme}>
      <div class="grid-container-2">
      <div class="grid-child a purple"> 
        
          <div>
            <FormControl
            fullWidth
            style={{ 'margin-top': '8px' }}
            >
            <InputLabel 
            color="warning"
            >Graph Representation Input</InputLabel>
            <Select
            placeholder='Graph'
            value={selectedOption}
            label="Graph Representation Input"
            onChange={handleOptionChange}
            fullWidth
            style={{ 'margin-top': '8px'}}
            color="warning"
            variant='outlined'
            >
            <MenuItem value="edgeList">Edge List</MenuItem>
            <MenuItem value="adjacencyMatrix">Adjacency Matrix</MenuItem>
            <MenuItem value="adjacencyList">Adjacency List</MenuItem>
            </Select>
            </FormControl>
          </div>
          <Button  style={{ 'margin-top': '12px' }} color="warning" className='inside' variant="contained" fullWidth onClick={handleDirectedChange}>
              {directed ? 'Directed' : 'Undirected'}
            </Button>
            <Button defaultValue={false} style={{ 'margin-top': '12px' }} color="warning" variant="contained" fullWidth onClick={handleWeightedChange}>
              {weighted ? 'Weighted' : 'Unweighted'}
            </Button>
            

          {selectedOption === 'edgeList' && (
          <div>

            <TextField
              disabled={!weighted}
              label="Weight Separator"
              value={weightSeparator}
              onChange={handleweightSeparatorChange}
              fullWidth
              color="warning"
              focused
              style={{ 'margin-top': '12px' }}
             
            />
            <TextField
              label="Separator"
              value={separator}
              onChange={handleSeparatorChange}
              fullWidth
              color="warning"
              focused
              style={{ 'margin-top': '12px' }}
             
            />
            <TextField

              label="Input"
              value={input}
              onChange={handleInputChange}
              fullWidth
              color="warning"
              focused
              multiline
              rows={20}
              style={{ 'margin-top': '12px' }}
              
            />
            
          </div>
          ) }

          {selectedOption === 'adjacencyMatrix' && (
          <div>
            <Button style={{ 'margin-top': '12px' }} color="warning" variant="contained" fullWidth onClick={handleShowVertexNameChange}>
              {showVertexName ?  'Labels in first line' : "No labels in first line"}
            </Button>
            
            <TextField
              label="Separator"
              value={separator}
              onChange={handleSeparatorChange}
              fullWidth
              color="warning"
              focused
              style={{ 'margin-top': '12px' }}
             
            />
            <TextField
              label="Input"
              value={input}
              onChange={handleInputChange}
              fullWidth
              color="warning"
              focused
              multiline
              rows={20}
              style={{ 'margin-top': '12px' }}
              
            />
            
          </div>
          ) }

          {selectedOption === 'adjacencyList' && (
          <div>

            <TextField
              disabled={!weighted}
              label="Weight Separator"
              value={weightSeparator}
              onChange={handleweightSeparatorChange}
              fullWidth
              color="warning"
              focused
              style={{ 'margin-top': '12px' }}
             
            />
            <TextField
              label="Ancestor Separator"
              value={ancestorSeparator}
              onChange={handleancestorSeparatorChange}
              fullWidth
              color="warning"
              focused
              style={{ 'margin-top': '12px' }}
             
            />
            <TextField
              label="Separator"
              value={separator}
              onChange={handleSeparatorChange}
              fullWidth
              color="warning"
              focused
              style={{ 'margin-top': '12px' }}
             
            />
            <TextField
              label="Input"
              value={input}
              onChange={handleInputChange}
              fullWidth
              color="warning"
              focused
              multiline
              rows={20}
              style={{ 'margin-top': '12px' }}
              
            />
            
          </div>
          ) } 
            
      </div>


      <div class="grid-child ">
        <Button onClick={handleSubmit} variant="contained" style={{ 'margin-top': '12px' }} color="success" disabled={selectedOption===''}>Show Graph</Button>
        <Button
            variant="contained" 
            disabled={!showGraph}
            style={{ 'margin-top': '12px' }} 
            color="success"
            onClick={handleCaptureImage}
          >
            Generate JPG
          </Button>
          
      </div>        




      <div class="grid-child " > 
      <div style={{ height: '800px' }} id="elementToCapture">
      {showGraph && <Graph graphData={graphData} graphOptions={options} />}



      </div>
      
      

      

      
      </div>      
  </div>
  
  </ThemeProvider>
    );
  }