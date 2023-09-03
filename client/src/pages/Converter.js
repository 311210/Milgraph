import React, { useState } from 'react';
import { Button, MenuItem, Select, TextField, InputLabel, FormControl,ThemeProvider, colors} from '@mui/material';
import "../styles.css";
import theme from './theme';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
export default function Converter() {
    const [selectedOption, setSelectedOption] = useState('');
    const [separator, setSeparator] = useState(',');
    const [ancestorSeparator, setancestorSeparator] = useState('->');
    const [weightSeparator, setweightSeparator] = useState(':');
    const [showVertexName, setShowVertexName] = useState(false);
    const [weighted, setWeighted] = useState(false);
    const [directed, setDirected] = useState(false);
    const [input, setInput] = useState('');


    const [selectedOptionOutput, setSelectedOptionOutput] = useState('');
    const [separatorOutput, setSeparatorOutput] = useState(',');
    const [ancestorSeparatorOutput, setancestorSeparatorOutput] = useState('->');
    const [weightSeparatorOutput, setweightSeparatorOutput] = useState(':');
    const [showVertexNameOutput, setShowVertexNameOutput] = useState(false);

    const [output, setOutput] = useState('');
    const [info, setInfo] = useState('');


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



    const handleOptionChangeOutput = (event) => {
      const selectedOptionOutput = event.target.value;
      setSelectedOptionOutput(selectedOptionOutput);
    };
    const handleweightSeparatorChangeOutput = (event) => {
      const weightSeparatorOutput = event.target.value;
      setweightSeparator(weightSeparatorOutput);
    };
    const handleSeparatorChangeOutput = (event) => {
      const separatorOutput = event.target.value;
      setSeparatorOutput(separatorOutput);
    };
    const handleancestorSeparatorChangeOutput = (event) => {
      const Output = event.target.value;
      setancestorSeparatorOutput(ancestorSeparatorOutput);
    };

    const handleOutputChange = (event) => {
      const output = event.target.value;
      setOutput(output);
    };

    const handleInfoChange = (event) => {
      const output = event.target.value;
      setInfo(output);
    };
  
    const handleShowVertexNameChangeOutput = () => {
      setShowVertexNameOutput(!showVertexNameOutput);
    };




  
    const handleWeightedChange = () => {
      setWeighted(!weighted);
    };
  
    const handleDirectedChange = () => {
      setDirected(!directed);
    };

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
 
      navigate('/Visualization', {
        state: {
          selectedOption:selectedOption,
          separator:separator,
          weightSeparator:weightSeparator,
          ancestorSeparator:ancestorSeparator,
          showVertexName:showVertexName,
          weighted:weighted,
          directed:directed,
          input:input,

        }
      });
    }
  
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
        selectedOptionOutput:selectedOptionOutput,
        separatorOutput:separatorOutput,
        ancestorSeparatorOutput:ancestorSeparatorOutput,
        showVertexNameOutput:showVertexNameOutput,
      };
      
      try {
        const response = await axios.post('/convert', requestData);
        const outputData = response.data.output;
        const infoData = response.data.info;
        console.log(response.data)
        setOutput(outputData);
        setInfo(infoData);
      } catch (error) {
        console.error('Error sending data to Flask:', error);
      }

    };
  
    return (
      <ThemeProvider theme={theme}>
      <div class="grid-container-1">
      <div class="grid-child purple"> 
        
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
        <Button onClick={handleSubmit} variant="contained" style={{ 'margin-top': '12px', 'marginRight':'20px' }} color="success" disabled={selectedOption=='' || selectedOptionOutput==''}>Convert</Button>
        <Button onClick={routeChange} variant="contained" style={{ 'margin-top': '12px' }} color="success" disabled={selectedOption=='' || selectedOptionOutput==''}>Show Graph</Button>
        <TextField
              label="Graph Info"
              value={info}
              onChange={handleInfoChange}
              fullWidth
          color="warning"
          focused
          multiline
          rows={10}
          style={{ 'margin-top': '100px', }}
             
            />
      </div>   
           




      <div class="grid-child "> 
        
      <div>
        <FormControl
        fullWidth
        style={{ 'margin-top': '8px' }}
        >
        <InputLabel color="warning">Graph Representation Output</InputLabel>
        <Select
        value={selectedOptionOutput}
        label="Graph Representation Output"
        onChange={handleOptionChangeOutput}
        fullWidth
        style={{ 'margin-top': '8px' }}
        color="warning"
        focused
        variant='outlined'
        
        >
        <MenuItem value="edgeListOutput">Edge List</MenuItem>
        <MenuItem value="adjacencyMatrixOutput">Adjacency Matrix</MenuItem>
        <MenuItem value="adjacencyListOutput">Adjacency List</MenuItem>
        <MenuItem value="javaEdgeListOutput">Java Edge List</MenuItem>
        <MenuItem value="pythonEdgeListOutput">Python Edge List</MenuItem>
        <MenuItem value="pythonAdjacencyListOutput">Python Adjacency List</MenuItem>
        <MenuItem value="javaAdjacencyMatrixOutput">Java Matrix List</MenuItem>
        <MenuItem value="pythonAdjacencyMatrixOutput">Java Python List</MenuItem>
        </Select>
        </FormControl>
      </div>

      {selectedOptionOutput === 'edgeListOutput' && (
      <div>
              <TextField
              disabled={!weighted}
              label="Weight Separator"
              value={weightSeparatorOutput}
              onChange={handleweightSeparatorChange}
              fullWidth
              color="warning"
              focused
              style={{ 'margin-top': '12px' }}
             
            />
        <TextField
          label="Separator"
          value={separatorOutput}
          onChange={handleSeparatorChangeOutput}
          fullWidth
          color="warning"
          focused
          style={{ 'margin-top': '12px' }}
         
        />
        <TextField
          label="Output"
          value={output}
          onChange={handleOutputChange}
          fullWidth
          color="warning"
          focused
          multiline
          rows={20}
          style={{ 'margin-top': '12px' }}
          
        />
        
      </div>
      ) }

      {selectedOptionOutput === 'adjacencyMatrixOutput' && (
      <div>
        <Button style={{ 'margin-top': '12px' }} color="warning" variant="contained" fullWidth onClick={handleShowVertexNameChangeOutput}>
          {showVertexNameOutput ? 'Labels in first line': "No labels in first line" }
        </Button>
        
        <TextField
          label="Separator"
          value={separatorOutput}
          onChange={handleSeparatorChangeOutput}
          fullWidth
          color="warning"
          focused
          style={{ 'margin-top': '12px' }}
         
        />
        
        <TextField
          label="Output"
          value={output}
          onChange={handleOutputChange}
          fullWidth
          color="warning"
          focused
          multiline
          rows={20}
          style={{ 'margin-top': '12px', whiteSpace: 'pre-line' }}

        />
        
      </div>
      ) }

      {selectedOptionOutput === 'adjacencyListOutput' && (
      <div>
              <TextField
              disabled={!weighted}
              label="Weight Separator"
              value={weightSeparatorOutput}
              onChange={handleweightSeparatorChange}
              fullWidth
              color="warning"
              focused
              style={{ 'margin-top': '12px' }}
             
            />
        <TextField
          label="Ancestor Separator"
          value={ancestorSeparatorOutput}
          onChange={handleancestorSeparatorChangeOutput}
          fullWidth
          color="warning"
          focused
          style={{ 'margin-top': '12px' }}
         
        />
        <TextField
          label="Separator"
          value={separatorOutput}
          onChange={handleSeparatorChangeOutput}
          fullWidth
          color="warning"
          focused
          style={{ 'margin-top': '12px' }}
         
        />
        <TextField
          label="Output"
          value={output}
          onChange={handleOutputChange}
          fullWidth
          color="warning"
          focused
          multiline
          rows={20}
          style={{ 'margin-top': '12px' }}
          
        />
        
      </div>
      ) } 

      {selectedOptionOutput === 'javaEdgeListOutput' && (
            <div>
              
              <TextField
                label="Output"
                value={output}
                onChange={handleOutputChange}
                fullWidth
                color="warning"
                focused
                multiline
                rows={20}
                style={{ 'margin-top': '12px' }}
                
              />
              
            </div>
            ) }
      {selectedOptionOutput === 'pythonEdgeListOutput' && (
            <div>
              
              <TextField
                label="Output"
                value={output}
                onChange={handleOutputChange}
                fullWidth
                color="warning"
                focused
                multiline
                rows={20}
                style={{ 'margin-top': '12px' }}
                
              />
              
            </div>
            ) }

            {selectedOptionOutput === 'pythonAdjacencyListOutput' && (
            <div>
              
              <TextField
                label="Output"
                value={output}
                onChange={handleOutputChange}
                fullWidth
                color="warning"
                focused
                multiline
                rows={20}
                style={{ 'margin-top': '12px' }}
                
              />
              
            </div>
            ) }
            {selectedOptionOutput === 'javaAdjacencyMatrixOutput' && (
            <div>
              
              <TextField
                label="Output"
                value={output}
                onChange={handleOutputChange}
                fullWidth
                color="warning"
                focused
                multiline
                rows={20}
                style={{ 'margin-top': '12px' }}
                
              />
              
            </div>
            ) } 
                        {selectedOptionOutput === 'pythonAdjacencyMatrixOutput' && (
            <div>
              
              <TextField
                label="Output"
                value={output}
                onChange={handleOutputChange}
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
  </div>
  </ThemeProvider>
    );
  }