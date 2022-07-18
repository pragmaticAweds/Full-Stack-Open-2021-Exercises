import React, { useEffect } from "react";
import { Typography, Button } from "@material-ui/core";
import { useStateValue } from "../state/state";
import { Female, Male } from "@mui/icons-material";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { setSinglePatient } from "../state";
import { Entry, EntryType, NewEntryWithoutId } from "../types";
import HospitalCheckEntry from "../components/HospitalCheckEntry";
import OccupationEntryCheck from "../components/OccupationEntryCheck";
import HealthCheck from "../components/HealthCheckEntry";
import AddEntryModal from "../AddEntry";

function index(): React.ReactElement {
  const [{ patientRecords, diagnoses }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewEntry = async (values: NewEntryWithoutId) => {
    try {
      console.log({ values });
      // const data = await axios.post<EntryType>(
      //   `${apiBaseUrl}/${id}/entries`,
      //   values
      // );
      // console.log({ data });

      // dispatch(addPatient(newPatient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
}

export default index;
