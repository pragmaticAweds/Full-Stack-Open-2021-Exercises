import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { useStateValue } from "../state/state";
import { Female, Male } from "@mui/icons-material";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { setSinglePatient } from "../state";

function index() {
  const [{ patientRecords }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
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
          <Typography variant="h4" style={{ margin: "2rem 0" }}>
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
        </>
      ) : null}
    </div>
  );
}

export default index;
