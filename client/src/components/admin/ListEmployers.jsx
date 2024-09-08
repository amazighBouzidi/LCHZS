import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Input from '@mui/joy/Input';
import { getAllUsers } from '../../helper/helperUser';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import DeleteEmployer from './DeleteEmployer';
import BlockEmployer from './BlockEmployer';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddEmployer from './AddEmployer';
import toast, { Toaster } from 'react-hot-toast';


export default function ListEmployers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [employers, setEmployers] = useState([]);
  const [filteredEmployers, setFilteredEmployers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredEmployers.slice(indexOfFirstRow, indexOfLastRow);
  const [totalPages, setTotalPages] = useState(0)
  const [selectedRowForBlock, setSelectedRowForBlock] = useState(null);
  const [selectedRowForDelete, setSelectedRowForDelete] = useState(null);
  const [showModalAddEmployer, setShowModalAddEmployer] = useState(false);

  const handleshowModalAddEmployer = () => {
    setShowModalAddEmployer(true);
  };

  const handleCloseModalAddEmployer = () => {
    setShowModalAddEmployer(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  const handleshowModalBlockEmployer = (row) => {
    setSelectedRowForBlock(row);
  };

  const handleCloseModalBlockEmployer = () => {
    setSelectedRowForBlock(null);
  };

  const handleshowModalDeleteEmployer = (row) => {
    setSelectedRowForDelete(row);
  };

  const handleCloseModalDeleteEmployer = () => {
    setSelectedRowForDelete(null);
  };

  const handleDelete = (employerToDelete) => {
    // Filter out the deleted employer from the employers state
    const updatedEmployer = employers.filter((employer) => employer._id !== employerToDelete._id)
    setEmployers(updatedEmployer);
    setFilteredEmployers(updatedEmployer)
    const newTotalPages = Math.ceil((employers.length - 1) / rowsPerPage)
    setTotalPages(newTotalPages)
    setCurrentPage(1)
  };

  const handleBlock = (employerToBlock) => {

  }

  const handleAddEmployer = (newEmployer, msg) => {
    setEmployers([...employers, newEmployer]);
    setFilteredEmployers([...filteredEmployers, newEmployer]);
    const newTotalPages = Math.ceil((employers.length + 1) / rowsPerPage)
    setTotalPages(newTotalPages)

    toast.success(msg)
  };

  const handleErrorAddEmployer = () => {
    toast.error('Failed to add employer. Please try again.')
  }

  const handleFiltredRow = (event) => {
    const input = event.target.value.toLowerCase();
    setSearchInput(input);
    const filteredRows = employers.filter((row) =>
      `${row.firstName} ${row.lastName} ${row.email} ${row.phoneNumber} ${row.address} ${row.userType} ${row.dateBirth}`
        .toLowerCase()
        .includes(input)
    );
    setFilteredEmployers(filteredRows);
    const newtotalPages = Math.ceil(filteredRows.length / rowsPerPage);
    setTotalPages(newtotalPages);
    newtotalPages === 0 ? setCurrentPage(0): setCurrentPage(1)
  };

  useEffect(() => {
    getAllUsers()
      .then(users => {
        setEmployers(users);
        setFilteredEmployers(users);
        const Pages = Math.ceil(users.length / rowsPerPage)
        setTotalPages(Pages) 
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="table-data">
      <div className="order">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className="head">
          <h3>Liste Des Employers</h3>
          <AddEmployer 
            show={showModalAddEmployer} 
            handleClose={handleCloseModalAddEmployer}
            onAddEmployer={handleAddEmployer}
            onErrorAddEmployer={handleErrorAddEmployer}
          />
          <PersonAddAlt1Icon
            onClick={handleshowModalAddEmployer} 
            style={{cursor: 'pointer', color:'#3C91E6'}}
          />
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
              <th>User</th>
              <th>Adresse</th>
              <th>Téléphone</th>
              <th>Date De Naissance</th>
              <th>Type</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row._id}>
                {selectedRowForDelete === row && (
                  <DeleteEmployer
                    row={row}
                    open={true}
                    onClose={handleCloseModalDeleteEmployer}
                    onDelete={handleDelete}
                  />  
                )}
                {selectedRowForBlock === row && (
                  <BlockEmployer
                    row={row}
                    open={true}
                    onClose={handleCloseModalBlockEmployer}
                    onBlock={handleBlock}
                  />  
                )}
                <td>
                  <img src={row.profile} alt="avatar" />
                  
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                  <p>{`${row.firstName} ${row.lastName}`}</p>
                  <Typography variant='body1' style={{color: '#595959ad'}}>{row.email}</Typography>
                  </div>
                </td>
                <td>
                  {row.address}
                </td>
                <td>
                  {row.phoneNumber}
                </td>
                <td>
                  {row.dateBirth.split('T')[0]}
                </td>
                <td>
                  {row.userType}
                </td>
                <td>
                  <div style={{display: 'flex', flexDirection: 'row', cursor: 'pointer'}}>
                    <BlockIcon color='success' onClick={() => handleshowModalBlockEmployer(row)} />
                    /
                    <DeleteIcon color='error' onClick={() => handleshowModalDeleteEmployer(row)} />
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


