import { PrismaClient, Prisma } from '@prisma/client';
import { checkIsOnDemandRevalidate } from 'next/dist/server/api-utils';
import { ChoreData, ChoreProps } from '@/components/chore-data';

const prisma = new PrismaClient();

export async function getChoresData() {
    return await prisma.chore.findMany();
}

export async function getAllRootChores() {
    return await prisma.chore.findMany(
        {
            include: { childChores: true },
            where: { parentChores: { none: {} } }
        })
}

export async function getAllChoreIds() {
    const chores = await prisma.chore.findMany(
        { select: { id: true } }
    );

    return chores.map(chore => {
        return {
            params: {
                id: chore.id
            }
        }
    });
}

function convertToProps(choreData: ChoreData): ChoreProps {
    return {
        ...choreData,
        createdAt: choreData.createdAt.toISOString(),
        updatedAt: choreData.createdAt.toISOString(),
        deadline: choreData.deadline.toISOString(),
        parentChores: choreData.parentChores ? choreData.parentChores.map(chore => {
            return {
                ...chore,
                createdAt: chore.createdAt.toISOString(),
                updatedAt: chore.updatedAt.toISOString(),
                deadline: choreData.deadline.toISOString(),
                parentChores: null,
                childChores: null
            }
        }) : choreData.parentChores,
        childChores: choreData.childChores ? choreData.childChores?.map(chore => {
            return {
                ...chore,
                createdAt: chore.createdAt.toISOString(),
                updatedAt: chore.updatedAt.toISOString(),
                deadline: choreData.deadline.toISOString(),
                parentChores: null,
                childChores: null
            }
        }) : choreData.childChores
    };
}


export async function getChoreData(id: string) {
    const chore = await prisma.chore.findFirst({
        where: { id: parseInt(id), },
        include: { parentChores: true, childChores: true }
    });
    if (chore) {
        return convertToProps(chore);
    }
    return null;
}