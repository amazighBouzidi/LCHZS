import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import useStore from "../../data/ValidationResultStore";
import { Button } from "@mui/joy";
import DoneIcon from "@mui/icons-material/Done";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate, useLocation } from "react-router-dom";
import { validateResultsPrescription } from "../../helper/helperResults";

export default function FormValidateAnalyse() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [results, setResults] = useState({});
  const { selectedResultsValidate } = useStore();
  const location = useLocation();
  const [test, setTest] = useState(location.state?.activeDashboard);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedResultsValidate) {
      const initialResults = {};
      selectedResultsValidate.analyses.forEach((analysis) => {
        if(!analysis.validateAnalysis){
          initialResults[analysis._id] = null;
        }
      });
      setResults(initialResults);
      console.log(initialResults)
    }
  }, [selectedResultsValidate]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleDoneClick = (id) => {
    setResults((prevResults) => ({
      ...prevResults,
      [id]: true,
    }));
  };

  const handleRestartClick = (id) => {
    setResults((prevResults) => ({
      ...prevResults,
      [id]: false,
    }));
  };

  const handleValidateClick = (e) => {
    e.preventDefault();

    // Check if any results are null
    const hasNull = Object.values(results).some((result) => result === null);
    if (hasNull) {
      toast.error("valider tout les résultats s'il vous plait");
      console.log("Results contain null values, final results not displayed.");
      return;
    }

    let validatePrescription = "validated";
    Object.values(results).forEach((result) => {
      if (result === false) {
        validatePrescription = "redo";
      }
    });

    const finalResults = {
      _id: selectedResultsValidate._id,
      ListAnalysisResults: results,
      validatePrescription: validatePrescription,
    };

    validateResultsPrescription(finalResults)
    .then(msg => {
      console.log("MSG: ", msg)
      navigate("/validatePrescriptionResults", {
        state: { 
          activePage: "/validatePrescriptionResults", 
          activeDashboard: test ,
          message: "Enregistrement fait avec succes"
        },
      })
    })
    .catch(err => console.log("ERR: ", err));
  };

  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            (selectedResultsValidate
              ? selectedResultsValidate.analyses.length
              : 0)
        )
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Sheet
        variant="outlined"
        sx={{
          width: "100%",
          boxShadow: "sm",
          borderRadius: "sm",
          padding: 2,
          marginBottom: 2,
        }}
      >
        <form onSubmit={handleValidateClick}>
          <Table aria-labelledby="tableTitle" hoverRow>
            <thead>
              <tr>
                <th>Analyses</th>
                <th>Resultats</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedResultsValidate &&
                selectedResultsValidate.analyses.map((analysis) => (
                  <tr key={analysis._id}>
                    <td>{analysis.nom}</td>
                    <td>{analysis.result}</td>
                    {analysis.validateAnalysis ? (
                      <td>
                        <Typography variant="body1">ce resultat est valider</Typography>
                      </td>
                    ) : (
                       <td>
                        {results[analysis._id] == null ? (
                          <Box>
                            <IconButton
                              onClick={() => handleDoneClick(analysis._id)}
                            >
                              <DoneIcon sx={{ color: "#3C91E6" }} />
                            </IconButton>
                            <IconButton
                              onClick={() => handleRestartClick(analysis._id)}
                            >
                              <RestartAltIcon sx={{ color: "#FFCE26" }} />
                            </IconButton>
                          </Box>
                        ) : results[analysis._id] == true ? (
                          <Typography variant="body1" color="initial">
                            valider
                          </Typography>
                        ) : results[analysis._id] == false ? (
                          <Typography variant="body1" color="initial">
                            à refaire
                          </Typography>
                        ) : (
                          ""
                        )}
                      </td>
                    )}                   
                  </tr>
                ))}
              {emptyRows > 0 && (
                <tr style={{ height: 53 * emptyRows }}>
                  <td colSpan={3} />
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Typography>
                      {page * rowsPerPage + 1}–
                      {Math.min(
                        (page + 1) * rowsPerPage,
                        selectedResultsValidate
                          ? selectedResultsValidate.analyses.length
                          : 0
                      )}{" "}
                      of{" "}
                      {selectedResultsValidate
                        ? selectedResultsValidate.analyses.length
                        : 0}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        size="sm"
                        color="neutral"
                        variant="outlined"
                        disabled={page === 0}
                        onClick={() => handleChangePage(page - 1)}
                      >
                        <KeyboardArrowLeft />
                      </IconButton>
                      <IconButton
                        size="sm"
                        color="neutral"
                        variant="outlined"
                        disabled={
                          page >=
                          Math.ceil(
                            (selectedResultsValidate
                              ? selectedResultsValidate.analyses.length
                              : 0) / rowsPerPage
                          ) -
                            1
                        }
                        onClick={() => handleChangePage(page + 1)}
                      >
                        <KeyboardArrowRight />
                      </IconButton>
                    </Box>
                  </Box>
                </td>
              </tr>
            </tfoot>
          </Table>
          <Box sx={{ width: "100%" }}>
            <Button fullWidth type="submit">
              Valider les analyses
            </Button>
          </Box>
        </form>
      </Sheet>
    </Box>
  );
}
