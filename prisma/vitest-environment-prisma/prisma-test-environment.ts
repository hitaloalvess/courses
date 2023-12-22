import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL) // Transforma a string database em um objeto URL

  url.searchParams.set('schema', schema) // Troca o ?schema= da URL

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL // Troca a URL

    execSync('npx prisma migrate deploy') // Executa o comando para criar as tabelas do banco com base nas migrations

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        ) // executeRawUnsafe permite que seja executado qualquer tipo de comando, seja ele seguro ou malicioso. Já o executeRaw só permite que comandos seguros que não possam prejudicar o database sejam executados

        await prisma.$disconnect()
      },
    }
  },
  transformMode: 'ssr',
}
