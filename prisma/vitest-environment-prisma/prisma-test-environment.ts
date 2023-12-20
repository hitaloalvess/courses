import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  setup() {
    console.log('Setup')
    return {
      teardown() {
        console.log('Teardown')
      },
    }
  },
  transformMode: 'ssr',
}
