import { PrismaClient } from '@prisma/client'
import { set } from 'date-fns'


const prisma = new PrismaClient()


async function main() {
      //  await prisma.chore.create({
      //    data: {
      //      title: 'Super Parent Chore',
      //       deadline: set(new Date(), { year: 2023, month: 10, date: 3, hours: 1, minutes: 10 }),
      //       cadence: 3600
      //     },
      //   })

      //   await prisma.chore.create({
      //       data: {
      //         title: 'Parent and Child',
      //          deadline: set(new Date(), { year: 2023, month: 10, date: 3, hours: 1, minutes: 10 }),
      //          cadence: 3600
      //        },
      //      })

      //      await prisma.chore.create({
      //       data: {
      //         title: 'Child Only',
      //          deadline: set(new Date(), { year: 2023, month: 10, date: 3, hours: 1, minutes: 10 }),
      //          cadence: 3600
      //        },
      //      })

       await prisma.chore.update({
        where: {
            id: 1
        },
        data: {
            childChores: {
                connect: {
                    id:2,
                }
            }
        }}
       )

       await prisma.chore.update({
        where: {id: 2},
        data: {
            childChores: {
                connect: {id:3,}
            }
        }})

      
       const allChores = await prisma.chore.findMany({
          include: {
            parentChores: true,
            childChores: true,
          },
        })
        console.dir(allChores, { depth: null })

}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {

  console.error(e)

  await prisma.$disconnect()

  process.exit(1)

})