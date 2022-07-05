import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { useStateValue } from "../state/state";
import { Female, Male } from "@mui/icons-material";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { setSinglePatient } from "../state";
import { Entry } from "../types";

function index(): React.ReactElement {
  const [{ patientRecords }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchSinglePatient = async () => {
      try {
        const { data } = await axios.get(`${apiBaseUrl}/patients/${id}`);
        dispatch(setSinglePatient(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglePatient();
  }, [dispatch]);
  console.log({ patientRecords });
  return (
    <div>
      {patientRecords !== null ? (
        <>
          <Typography variant="h4" style={{ margin: "1rem 0" }}>
            {patientRecords.name}
            {patientRecords ? (
              patientRecords.gender === "female" ? (
                <Female />
              ) : (
                <Male />
              )
            ) : (
              ""
            )}
          </Typography>
          <Typography variant="body1">ssn: {patientRecords.ssn}</Typography>
          <Typography variant="body1">
            occupation: {patientRecords.occupation}
          </Typography>
          <Typography
            variant="h5"
            style={{ margin: "1.5rem 0", fontWeight: "700" }}
          >
            entries
          </Typography>
          <div>
            {patientRecords.entries?.map((patient: Entry) => (
              <div key={`entry_Key_${patient.id}}`}>
                <Typography>{patient.description}</Typography>
                <ul>
                  {patient.diagnosisCodes?.map((code, i) => (
                    <li key={`code_Key_${i}`}>{code}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default index;
