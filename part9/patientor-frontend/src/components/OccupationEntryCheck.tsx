import { OccupationalHealthcareEntry } from "../types";
import { Work } from "@mui/icons-material";
import { useStateValue } from "../state";

const OccupationEntryCheck = ({
  date,
  description,
  specialist,
  employerName,
  diagnosisCodes,
  sickLeave,
}: OccupationalHealthcareEntry) => {
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
        {date} <Work /> {employerName}
      </p>
      <p>{description}</p>

      <p>diagnose by {specialist}</p>

      {sickLeave && (
        <div>
          <div>Sick Leave:</div>
          <ul>
            <li>Sick leave start date: {sickLeave?.startDate}</li>
            <li>Sick leave end date: {sickLeave?.endDate}</li>
          </ul>
        </div>
      )}
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

export default OccupationEntryCheck;
