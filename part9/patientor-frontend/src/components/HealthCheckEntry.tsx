import { HealthCheckEntry } from "../types";
import { MedicalServices, Favorite } from "@mui/icons-material";
import { useStateValue } from "../state";

const HealthCheck = ({
  date,
  description,
  specialist,
  employerName,
  diagnosisCodes,
  healthCheckRating,
}: HealthCheckEntry) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "1rem",
        padding: "0 0.5rem",
        marginBottom: "0.7rem",
      }}
    >
      <p>
        {date} <MedicalServices /> {employerName}
      </p>
      <p>{description}</p>
      <Favorite
        sx={{
          color: `${
            healthCheckRating === 0
              ? "green"
              : healthCheckRating === 1
              ? "yellow"
              : "red"
          }`,
        }}
      />
      <p>diagnose by {specialist}</p>
      <div>
        <h3>Diagnosis</h3>
        <ul>
          {diagnosisCodes?.map((code, i) => {
            const diagnosis = diagnoses.hasOwnProperty(code)
              ? diagnoses[code]
              : null;
            return (
              <li key={`code_Key_${i}`}>
                {code} {diagnosis?.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HealthCheck;
