import React, { useState, useEffect } from 'react';
import { getAllPrescriptions } from '../../helper/helperPrescription'; // Import the function to fetch prescriptions
import { Input, Typography, Button } from '@mui/joy'; // Import MUI components
import SearchIcon from '@mui/icons-material/Search';// Import search icon
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Import chevron left icon
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import { useNavigate, useLocation } from 'react-router-dom'
import PrescriptionDetail from './PrescriptionDetail';

export default function ListPrescriptions() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPrescriptions.slice(indexOfFirstRow, indexOfLastRow);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();
  const [test, setTest] = useState(location.state.activeDashboard)
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowForConsult, setSelectedRowForConsult] = useState(null);

  const handleshowModalConsult = (row) => {
    setSelectedRowForConsult(row);
  };

  const handleCloseModalConsult = () => {
    setSelectedRowForConsult(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  const handleFilteredPrescriptions = (event) => {
    const input = event.target.value.toLowerCase();
    setSearchInput(input);
    const filteredRows = prescriptions.filter((row) =>
      `${row.patientName} ${row.doctorName} ${row.numberOfAnalyses} ${row.dateCreation}`
        .toLowerCase()
        .includes(input)
    );
    setFilteredPrescriptions(filteredRows);
    const newTotalPages = Math.ceil(filteredRows.length / rowsPerPage);
    setTotalPages(newTotalPages);
    newTotalPages === 0 ? setCurrentPage(0) : setCurrentPage(1);
  };

  useEffect(() => {
    getAllPrescriptions() // Call the API function to fetch prescriptions
      .then((formattedPrescriptions) => {
        setPrescriptions(formattedPrescriptions);
        setFilteredPrescriptions(formattedPrescriptions);
        const Pages = Math.ceil(formattedPrescriptions.length / rowsPerPage);
        setTotalPages(Pages);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="table-data">
      <div className="order">
        <div className="head">
          <h3>Liste Des Ordonnance</h3>
          <PlaylistAddCircleIcon 
            style={{cursor: 'pointer', color:'#3C91E6'}}
            onClick={() => navigate('/addPrescriptions', {state: { activePage: '/listePrescriptions', activeDashboard: test }})}
          />
          <Input
            type="text"
            variant="soft"
            placeholder="Rechercher"
            startDecorator={<SearchIcon />}
            onChange={(e) => handleFilteredPrescriptions(e)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Analyses Count</th>
              <th>Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row._id}>
                {selectedRowForConsult === row && (
                  <PrescriptionDetail
                    prescription={row}
                    isOpen={true}
                    onClose={handleCloseModalConsult}
                  />  
                )}
                <td>{row.patientName}</td>
                <td>{row.doctorName}</td>
                <td>{row.numberOfAnalyses}</td>
                <td>{row.dateCreation}</td>
                <td>
                  <Button
                    onClick={() => handleshowModalConsult(row)}
                  >
                    Consulter
                  </Button>
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
