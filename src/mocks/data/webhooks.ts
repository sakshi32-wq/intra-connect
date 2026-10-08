import { WEBHOOK_METHODS } from '#/features/webhooks/types'
import type { Webhook } from '#/features/webhooks/types'
import { createRandom, minutesAgo } from '../seed'
import { practiceConnectionsSeed, practicesSeed } from './practices'

const random = createRandom(34)

const PURPOSES = ['Appointments', 'Patients', 'Claims', 'Lab Results']

function token() {
  const hex = () => random.next().toString(16).slice(2, 10)
  return `${hex()}-${hex().slice(0, 4)}-${hex().slice(0, 4)}-${hex()}`
}

export const webhooksSeed: Array<Webhook> = practiceConnectionsSeed.flatMap(
  ({ practiceId }, practiceIndex) => {
    const practice = practicesSeed.find(({ id }) => id === practiceId)
    if (!practice) return []
    const base = practice.name.replace(/[^A-Za-z]/g, '')
    return Array.from({ length: random.int(0, 4) }, (_, index) => {
      const purpose = PURPOSES[index % PURPOSES.length]
      const verified = random.chance(0.8)
      return {
        id: `${practiceId}_whk_${index + 1}`,
        practiceId,
        name: `${base}${purpose.replace(' ', '')}Webhook`,
        url: `https://hooks.${base.toLowerCase()}.com/intraconnects/${purpose.toLowerCase().replace(' ', '-')}`,
        method: index === 0 ? 'POST' : random.pick(WEBHOOK_METHODS),
        tokenId: token(),
        verified,
        status: verified && random.chance(0.85) ? 'active' : 'inactive',
        createdAt: minutesAgo(practiceIndex * 600 + index * 90),
      }
    })
  },
)
