import type { DecisionOwnership } from "@/data/types";

const ownershipLabels: Record<DecisionOwnership, string> = {
  direct: "직접 구현/결정",
  team: "팀 결정/연동",
  analyzed: "구조 분석",
};

export function formatOwnership(ownership: DecisionOwnership, note?: string) {
  return note ? `${ownershipLabels[ownership]} · ${note}` : ownershipLabels[ownership];
}
