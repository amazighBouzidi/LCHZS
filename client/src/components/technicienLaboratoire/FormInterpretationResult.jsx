import * as React from 'react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import useStore from '../../data/interpretationResultStore';
import { Button } from '@mui/joy';
import { interpretatePrescription } from '../../helper/helperResults';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FormInterpretationResult() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { selectedPrescription } = useStore();
  const location = useLocation();
  const [test, setTest] = useState(location.state?.activeDashboard);
  const navigate = useNavigate();

  const interpretateResults = (values) => {
    const results = {
      resultsID: selectedPrescription._id,
      resultsInterpretation: values,
    };
    interpretatePrescription(results)
      .then((msg) => {
        console.log("MSG: ", msg)
        navigate("/InterpretationAnalysis", {
          state: {
            activePage: "/InterpretationAnalysis",
            activeDashboard: test,
            message: "Enregistrement fait avec succes"
          },
        })
      })
      .catch((error) => console.log("ERROR: ", error));
  };

  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object(
      selectedPrescription?.analyses.reduce((schema, analysis) => {
        if (!analysis.validateAnalysis) {
          schema[analysis._id] = Yup.string().required('Veuillez saisir resultat pour cette analyse');
        }
        return schema;
      }, {})
    ),
    onSubmit: interpretateResults,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (selectedPrescription) {
      const initialResults = {};
      selectedPrescription.analyses.forEach((analysis) => {
        if (!analysis.validateAnalysis) {
          initialResults[analysis._id] = "";
        }
      });
      formik.setValues(initialResults);
    }
  }, [selectedPrescription]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (selectedPrescription ? selectedPrescription.analyses.length : 0)) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Sheet variant="outlined" sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm', padding: 2, marginBottom: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <Table aria-labelledby="tableTitle" hoverRow>
            <thead>
              <tr>
                <th>Analyses</th>
                <th>Resultats</th>
              </tr>
            </thead>
            <tbody>
              {selectedPrescription && selectedPrescription.analyses.map((analysis) => (
                <tr key={analysis._id}>
                  <td>{analysis.nom}</td>
                  <td>
                    {analysis.validateAnalysis ? "ce résultat est valider" : (
                      <>
                        <Input
                          fullWidth
                          placeholder="entrer resultat"
                          name={analysis._id}
                          value={formik.values[analysis._id] || ''} // Provide a default value if results[analysis._id] is undefined
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched[analysis._id] && Boolean(formik.errors[analysis._id])}
                        />
                        {formik.touched[analysis._id] && formik.errors[analysis._id] && (
                          <Typography variant='body2' sx={{ color: 'red' }}>{formik.errors[analysis._id]}</Typography>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {emptyRows > 0 && (
                <tr style={{ height: 53 * emptyRows }}>
                  <td colSpan={2} />
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                    <Typography>
                      {page * rowsPerPage + 1}–{Math.min((page + 1) * rowsPerPage, selectedPrescription ? selectedPrescription.analyses.length : 0)} of {selectedPrescription ? selectedPrescription.analyses.length : 0}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
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
                        disabled={page >= Math.ceil((selectedPrescription ? selectedPrescription.analyses.length : 0) / rowsPerPage) - 1}
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
          <Box sx={{ width: '100%' }}>
            <Button fullWidth type="submit">
              Valider les analyses
            </Button>
          </Box>
        </form>
      </Sheet>
    </Box>
  );
}
