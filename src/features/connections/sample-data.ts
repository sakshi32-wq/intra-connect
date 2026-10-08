// Static sample data for the Connections UI (frames Connection, 56, 57, 61, 63; names
// typo-fixed and made unique per SCREEN_MAP §6). Replaced by api.ts when integration resumes.
import type { ActiveStatus, AppType, Connection, Ehr } from './types'

export const APP_TYPE_LABELS: Record<AppType, string> = {
  provider: 'Provider',
  system: 'System',
  patient: 'Patient',
}

/** Callback URL IntraConnect issues for a connection (read-only in the wizard). */
export function redirectUrlFor(id: string) {
  return `https://auth.intraconnects.com/cb/${id}`
}

/** Id the next created connection receives (shown in the add wizard's Redirect URL). */
export const NEXT_CONNECTION_ID = 'con_018'

type Seed = [ehr: Ehr, name: string, appType: AppType, status: ActiveStatus]

const SEEDS: Array<Seed> = [
  ['nextgen', 'TestNextgenPatient', 'patient', 'active'],
  ['epic', 'TestEpicSystem', 'system', 'inactive'],
  ['athenahealth', 'TestAthenaPatient', 'patient', 'active'],
  ['drchrono', 'TestDrchronoPatient', 'patient', 'active'],
  ['cerner', 'TestCernerSystem', 'system', 'active'],
  ['epic', 'TestEpicProvider', 'provider', 'active'],
  ['athenahealth', 'TestAthenaSystem', 'system', 'inactive'],
  ['drchrono', 'TestDrchronoSystem', 'system', 'active'],
  ['cerner', 'TestCernerPatient', 'patient', 'active'],
  ['epic', 'TestEpicPatient', 'patient', 'active'],
  ['athenahealth', 'TestAthenaProvider', 'provider', 'active'],
  ['nextgen', 'TestNextgenSystem', 'system', 'active'],
  ['cerner', 'TestCernerProvider', 'provider', 'inactive'],
  ['drchrono', 'TestDrchronoProvider', 'provider', 'active'],
  ['nextgen', 'TestNextgenProvider', 'provider', 'inactive'],
  ['athenahealth', 'AthenaPatientConnection', 'patient', 'active'],
  ['epic', 'Pace Hospital', 'patient', 'active'],
]

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

export const sampleConnections: Array<Connection> = SEEDS.map(([ehr, name, appType, status], index) => {
  const id = `con_${String(index + 1).padStart(3, '0')}`
  return {
    id,
    ehr,
    appType,
    name,
    clientId: String(73782 + index * 11),
    clientSecret: `${slug(name).replace(/-/g, '')}-${4821 + index}`,
    scope: `${ehr}/service ${APP_TYPE_LABELS[appType].toLowerCase()}.read`,
    audience: `https://fhir.${ehr}.com/r4`,
    nonce: index % 3 === 0 ? undefined : `n-${8130 + index * 7}`,
    launch: appType === 'patient' ? 'launch/patient' : undefined,
    orgRedirectUrl: `https://pace-hospital.org/oauth/${id}`,
    redirectUrl: redirectUrlFor(id),
    status,
    customerId: String(27353629257 + index * 7919),
    createdAt: new Date(Date.UTC(2026, 0, 5 + index * 9)).toISOString(),
  }
})

export function findSampleConnection(id: string) {
  return sampleConnections.find((connection) => connection.id === id)
}
