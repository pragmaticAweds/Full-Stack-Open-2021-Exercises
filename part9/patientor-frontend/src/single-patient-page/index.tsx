import React, { useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
import { useStateValue } from "../state/state";
import { Female, Male } from "@mui/icons-material";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { setSinglePatient } from "../state";
import { Entry } from "../types";
import HospitalCheckEntry from "../components/HospitalCheckEntry";
import OccupationEntryCheck from "../components/OccupationEntryCheck";
import HealthCheck from "../components/HealthCheckEntry";

function index(): React.ReactElement {
  const [{ patientRecords, diagnoses }, dispatch] = useStateValue();

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
            {patientRecords.entries?.map((patient: Entry) => {
              switch (patient.type) {
                case "Hospital":
                  return <HospitalCheckEntry key={patient.id} {...patient} />;
                case "OccupationalHealthcare":
                  return <OccupationEntryCheck key={patient.id} {...patient} />;
                case "HealthCheck":
                  return <HealthCheck key={patient.id} {...patient} />;

                default:
                  patient;
                  break;
              }
            })}
          </div>
        </>
      ) : null}
      <Button variant="contained" onClick={() => console.log("clicked")}>
        Add New Entry
      </Button>
    </div>
  );
}

export default index;
