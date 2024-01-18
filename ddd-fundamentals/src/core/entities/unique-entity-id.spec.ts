import { expect, test } from 'vitest'
import { UniqueEntityID } from './unique-entity-id'

test('should be able to generate unique id', () => {
  const id = new UniqueEntityID()

  expect(typeof id.toString()).toBe('string')
  expect(id.toString()).toMatch(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  )
})
