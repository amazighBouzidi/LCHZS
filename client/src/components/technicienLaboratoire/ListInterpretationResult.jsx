import React, { useState, useEffect } from 'react';
import { getAllResults } from '../../helper/helperResults'; // Import the function to fetch results
import { Input, Typography, Button } from '@mui/joy'; // Import MUI components
import SearchIcon from '@mui/icons-material/Search'; // Import search icon
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Import chevron left icon
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useStore from '../../data/interpretationResultStore';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function ListInterpretationResult() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredResults.slice(indexOfFirstRow, indexOfLastRow);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();
  const [test, setTest] = useState(location.state?.activeDashboard);
  const message = location.state?.message;
  const navigate = useNavigate();
  const setSelectedPrescription = useStore(state => state.setSelectedPrescription);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  const handleFilteredResults = (event) => {
    const input = event.target.value.toLowerCase();
    setSearchInput(input);
    const filteredRows = results.filter((row) =>
      `${row.patientName} ${row.dateCreation}`
        .toLowerCase()
        .includes(input)
    );
    setFilteredResults(filteredRows);
    const newTotalPages = Math.ceil(filteredRows.length / rowsPerPage);
    setTotalPages(newTotalPages);
    newTotalPages === 0 ? setCurrentPage(0) : setCurrentPage(1);
  };

  useEffect(() => {
    getAllResults() // Call the API function to fetch results
      .then((results) => {
        setResults(results);
        setFilteredResults(results);
        const Pages = Math.ceil(results.length / rowsPerPage);
        setTotalPages(Pages);
        if(message){
          toast.success(message)
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleButtonClick = (row) => {
    console.log(row)
    setSelectedPrescription(row)
    navigate('/addResultInterpretationAnalysis', { state: { activePage: '/InterpretationAnalysis', activeDashboard: test } })
  };

  return (
    <div className="table-data">
      <div className="order">
      <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className="head">
          <h3>Liste Des Ordonnance</h3>
          <Input
            type="text"
            variant="soft"
            placeholder="Rechercher"
            startDecorator={<SearchIcon />}
            onChange={(e) => handleFilteredResults(e)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Analyses Count</th>
              <th>Creation Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row._id}>
                <td>{row.patientName}</td>
                <td>{row.analyses.length}</td>
                <td>{new Date(row.dateCreation).toLocaleDateString()}</td>
                <td>
                  {row.validatePrescription === 'notValuated' ? (
                    <Button onClick={() => handleButtonClick(row)}>
                      Saisir Result
                    </Button>
                  ) : row.validatePrescription === 'redo' ? (
                    <Button onClick={() => handleButtonClick(row)}>
                      Refaire
                    </Button>
                  ) : row.validatePrescription === 'evaluating' ? (
                    <Typography>validation en attente</Typography>
                  ) :(
                    <Typography>Valider</Typography>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
          <ChevronLeftIcon onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          <Typography>{currentPage}/{totalPages}</Typography>
          <ChevronRightIcon onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </div>
      </div>
    </div>
  );
}
