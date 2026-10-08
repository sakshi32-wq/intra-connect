import { APP_TYPES, EHRS } from '#/features/connections/types'
import type { AppType, Connection, Ehr } from '#/features/connections/types'
import { createRandom, minutesAgo, padId } from '../seed'

const random = createRandom(55)

const EHR_LABEL: Record<Ehr, string> = {
  athenahealth: 'Athena',
  epic: 'Epic',
  cerner: 'Cerner',
  nextgen: 'Nextgen',
  drchrono: 'Drchrono',
}

const APP_TYPE_LABEL: Record<AppType, string> = {
  provider: 'Provider',
  system: 'System',
  patient: 'Patient',
}

const SCOPE: Record<Ehr, string> = {
  athenahealth: 'athena/service.Athenanet.MDP',
  epic: 'launch/patient openid fhirUser',
  cerner: 'system/Patient.read system/Observation.read',
  nextgen: 'patient/*.read launch',
  drchrono: 'user/patients.read user/clinical.read',
}

const ORGS = [
  'Test',
  'PaceHospital',
  'BombayHospital',
  'BirlaHospital',
  'MedicoverClinic',
]

// The frame shows the Test* rows first (Connection.png); keep that order.
const combos: Array<[string, Ehr, AppType]> = []
for (const org of ORGS) {
  for (const ehr of EHRS) {
    for (const appType of APP_TYPES) {
      combos.push([org, ehr, appType])
    }
  }
}

export const connectionsSeed: Array<Connection> = combos
  .filter((_, index) => index < 15 || random.chance(0.3))
  .map(([org, ehr, appType], index) => {
    const host = `${org.toLowerCase()}.${ehr}.intraconnects.dev`
    return {
      id: padId('con', index),
      ehr,
      appType,
      name: `${org}${EHR_LABEL[ehr]}${APP_TYPE_LABEL[appType]}`,
      clientId: String(73782 + index * 17),
      clientSecret: `${EHR_LABEL[ehr]}${random.digits(4)}`,
      scope: SCOPE[ehr],
      audience: `https://fhir.${ehr}.com/r4`,
      nonce: ehr === 'epic' || ehr === 'athenahealth' ? random.digits(8) : undefined,
      launch: appType === 'patient' ? 'Patient' : undefined,
      orgRedirectUrl: `https://${host}/oauth/callback`,
      redirectUrl: `https://app.intraconnects.com/oauth/${ehr}/${padId('con', index)}`,
      status: random.chance(0.25) ? 'inactive' : 'active',
      customerId: random.digits(11),
      createdAt: minutesAgo(index * 1440 + random.int(0, 600)),
    }
  })
