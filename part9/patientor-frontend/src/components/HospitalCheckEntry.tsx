import { HospitalEntry } from "../types";
import { useStateValue } from "../state";

const HospitalCheckEntry = ({
  date,
  description,
  specialist,
  diagnosisCodes,
  discharge,
}: HospitalEntry) => {
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
      <p>{date}</p>
      <p>{description}</p>

      <p>diagnose by {specialist}</p>
      {discharge && (
        <div>
          <div>Discharge Info:</div>
          <ul>
            <li>Discharged date: {discharge.date}</li>
            <li>Discharge criteria: {discharge.criteria}</li>
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

export default HospitalCheckEntry;
