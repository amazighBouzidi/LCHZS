import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Input from '@mui/joy/Input';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import { getAllAnalyses } from '../../helper/helperAnalyse';
import Textarea from '@mui/joy/Textarea';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteAnalyse from './DeleteAnalyse';
import UpdateAnalyse from './UpdateAnalyse';


export default function ListAnalyse() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [analyses, setAnalyses] = useState([]);
  const [filteredAnalyse, setFilteredAnalyse] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedRowForUpdate, setSelectedRowForUpdate] = useState(null);
  const [selectedRowForDelete, setSelectedRowForDelete] = useState(null);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredAnalyse.slice(indexOfFirstRow, indexOfLastRow);
  const [totalPages, setTotalPages] = useState(0)
  const textareaStyle = {
    border: 'none',
    color: 'black', 
    backgroundColor: '#F9F9F9',
  }

  const handleshowModalUpdateAnalyse = (row) => {
    setSelectedRowForUpdate(row);
  };

  const handleCloseModalUpdateAnalyse = () => {
    setSelectedRowForUpdate(null);
  };

  const handleshowModalDeleteAnalyse = (row) => {
    setSelectedRowForDelete(row);
  };

  const handleCloseModalDeleteAnalyse = () => {
    setSelectedRowForDelete(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  const handleFiltredRow = (event) => {
    const input = event.target.value.toLowerCase();
    setSearchInput(input);
    const filteredRows = analyses.filter((row) =>
      `${row.nom} ${row.code} ${row.description} ${row.prix}`
        .toLowerCase()
        .includes(input)
    );
    setFilteredAnalyse(filteredRows);
    const newtotalPages = Math.ceil(filteredRows.length / rowsPerPage);
    setTotalPages(newtotalPages);
    newtotalPages === 0 ? setCurrentPage(0): setCurrentPage(1)
  };

  const handleDelete = (analysisToDelete) => {
    // Filter out the deleted analysis from the analyses state
    const updatedAnalyses = analyses.filter((analysis) => analysis._id !== analysisToDelete._id);
    setAnalyses(updatedAnalyses);
    setFilteredAnalyse(updatedAnalyses);
  };

  const updateAnalysisInList = (updatedAnalysis) => {
    const updatedAnalyses = analyses.map(analysis =>
        analysis._id === updatedAnalysis._id ? updatedAnalysis : analysis
    );
    setAnalyses(updatedAnalyses);
    setFilteredAnalyse(updatedAnalyses);
  };

  useEffect(() => {
    getAllAnalyses()
      .then((analyses) =>{
        setAnalyses(analyses)
        setFilteredAnalyse(analyses)
        const Pages = Math.ceil(analyses.length / rowsPerPage)
        setTotalPages(Pages)
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="table-data">
      <div className="order">
        <div className="head">
          <h3>Liste Des Analyses</h3>
          <Input 
            type='text' 
            variant="soft" 
            placeholder='Rechercher' 
            startDecorator={<SearchIcon/>} 
            onChange={(e) => handleFiltredRow(e)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Analyse</th>
              <th>Code</th>
              <th>Déscription</th>
              <th>Prix</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row._id}>
                {selectedRowForDelete === row && (
                  <DeleteAnalyse
                    row={row}
                    open={true}
                    onClose={handleCloseModalDeleteAnalyse}
                    onDelete={handleDelete}
                  />  
                )}
                {selectedRowForUpdate === row && (
                  <UpdateAnalyse 
                    row={row}
                    open={true}
                    onClose={handleCloseModalUpdateAnalyse}
                    updateAnalysisInList={updateAnalysisInList}
                  />
                )}
                <td>
                  <img src={row.image} alt="avatar" style={{width: '90px', height: '50px', borderRadius: '10px'}} />
                  
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <p>{`${row.nom}`}</p>
                  </div>
                </td>
                <td>
                  {row.code}
                </td>
                <td>
                  <Textarea 
                    className='TextArea'
                    style={textareaStyle}
                    value={row.description}
                    variant="plain"  
                    disabled
                  />
                </td>
                <td>
                  {row.prix}
                </td>
                <td>
                  <div style={{display: 'flex', flexDirection: 'row', cursor: 'pointer'}}>
                    <EditIcon color='success' onClick={() => handleshowModalUpdateAnalyse(row)} />
                    /
                    <DeleteIcon color='error' onClick={() => handleshowModalDeleteAnalyse(row)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display: "flex", flexDirection: 'row', cursor: "pointer"}}>
          <ChevronLeftIcon  onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          <Typography>{currentPage}/{totalPages}</Typography>
          <ChevronRightIcon onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </div>
      </div>
    </div>
  );
}


