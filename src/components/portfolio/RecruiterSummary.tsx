import type { RecruiterSummary as RecruiterSummaryData } from "@/data/types";
import { RichText } from "./RichText";

interface RecruiterSummaryProps {
  summary: RecruiterSummaryData;
  variant?: "card" | "detail";
}

const rows: Array<{ key: keyof RecruiterSummaryData; label: string }> = [
  { key: "role", label: "role" },
  { key: "impact", label: "impact" },
  { key: "proof", label: "proof" },
];

export function RecruiterSummary({ summary, variant = "detail" }: RecruiterSummaryProps) {
  return (
    <dl className={`recruiter-summary recruiter-summary--${variant}`} aria-label="채용 스캔 요약">
      {rows.map((row) => (
        <div className="recruiter-summary-item" key={row.key}>
          <dt className="recruiter-summary-label">{row.label}</dt>
          <dd className="recruiter-summary-value">
            <RichText text={summary[row.key]} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
