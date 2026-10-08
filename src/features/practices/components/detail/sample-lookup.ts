import { samplePractice, samplePractices } from '#/features/practices/sample-data'
import type { Ehr } from '#/features/connections/types'
import type { Practice } from '#/features/practices/types'

/** The practice shown by the detail routes (unknown ids fall back to the sample practice). */
export function getSamplePractice(practiceId: string): Practice {
  return samplePractices.find((practice) => practice.id === practiceId) ?? samplePractice
}

/** Connection names per EHR and app type offered by the attach/edit wizard (UI-only sample). */
export const CONNECTION_OPTIONS: Record<Ehr, { patient: Array<string>; provider: Array<string> }> = {
  epic: { patient: ['EpicPatient13', 'TestEpicPatient'], provider: ['EpicTest12', 'TestEpicProvider'] },
  athenahealth: { patient: ['TestAthenaPatient', 'AthenaPatientConnection'], provider: ['TestAthenaProvider'] },
  cerner: { patient: ['TestCernerPatient'], provider: ['TestCernerSystem'] },
  nextgen: { patient: ['TestNextgenPatient'], provider: ['TestNextgenProvider'] },
  drchrono: { patient: ['TestDrchronoPatient'], provider: ['TestDrchronoProvider'] },
}

/** Values read from the linked connection on the Connection tab (28). */
export const sampleLinkedConnection = {
  orgRedirectUrl: 'https://pacehospital.com/ehr/callback',
  scope: 'launch/patient patient/*.read openid fhirUser',
  audience: 'https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4',
}
