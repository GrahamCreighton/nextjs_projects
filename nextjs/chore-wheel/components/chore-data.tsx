export interface ChoreData {
    id: number
    createdAt: Date,
    updatedAt: Date,
    title: string,
    notes: string | null,
    cadence: number,
    deadline: Date,
    parentChores: ChoreData[] | null,
    childChores: ChoreData[] | null
};

export interface ChoreProps {
        id: number
        createdAt: string,
        updatedAt: string,
        title: string,
        notes: string | null,
        cadence: number,
        deadline: string,
        parentChores: ChoreProps[] | null,
        childChores: ChoreProps[] | null
};