import { apiMock } from './support/apiMock.js'
import { emptyDatabase } from '../../support/database/DatabaseRepository.js'
import { expect } from 'chai'
import { readFileFromPath } from '../../support/helper.js'
import { showSeeder } from './support/showSeeder.js'
import { scheduled } from '../../../services/show/scheduler.js'

describe('Shows scheduler', async () => {
  context('example 1', () => {
    const needsUpdatingEx1 = [1, 2, 3]

    before(async () => {
      await emptyDatabase()
      await showSeeder({ filename: 'example1' })
      apiMock({ filename: 'example1' })
    })

    it('finds the IDs that need updating', async () => {
      const sch = await scheduled()
      const result = sch.updatesArray // replace with actual call
      expect(result).to.deep.equal(needsUpdatingEx1)
    })

    it('creates the update schedule', async () => {
      const sch = await scheduled()
      const result = sch.updates // replace with actual call
      const expected = { 1: +0, 2: 15, 3: 30 }
      expect(result).to.deep.equal(expected) // replace with expected schedule
    })
  })

  context.skip('example 2', () => {
    const needsUpdatingEx2 = [2, 4]

    before(async () => {
      await emptyDatabase()
      await showSeeder({ filename: 'example2' })
      apiMock({ filename: 'example2' })
    })

    it('finds the IDs that need updating', async () => {})

    it('creates the update schedule', async () => {})
  })

  context.skip('example 3', () => {
    const needsUpdatingEx3 = readFileFromPath({
      path: 'test/services/show/support/fixtures/example3-updates.txt'
    })
      .split('\n')
      .map(Number)

    before(async () => {
      await emptyDatabase()
      await showSeeder({ filename: 'example3' })
      apiMock({ filename: 'example3' })
    })

    it('finds the IDs that need updating', async () => {})

    it('creates the update schedule', async () => {})
  })
})
