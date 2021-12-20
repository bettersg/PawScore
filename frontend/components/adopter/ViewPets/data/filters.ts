import { Animal } from "@contract";

export const SpeciesFilterOptions = [
    {
        options: [
            {
                label: "Cat",
                value: Animal.Species.Cat,
            },
            {
                label: "Dog",
                value: Animal.Species.Dog,
            },
            {
                label: "Others",
                value: Animal.Species.Others,
            },
        ],
    },
];

export enum AgeFilter {
    Above0Months,
    Above6Months,
    Above12Months,
    Above36Months,
    Above72Months,
    Above120Months,
}

export const AgeFilterOptions = [
    {
        title: "Under a year",
        options: [
            {
                label: "1-6 months",
                value: AgeFilter.Above0Months,
            },
            {
                label: "7-12 months",
                value: AgeFilter.Above6Months,
            },
        ],
    },
    {
        title: "Beyond a year",
        options: [
            {
                label: "1-3 years",
                value: AgeFilter.Above12Months,
            },
            {
                label: "4-6 years",
                value: AgeFilter.Above36Months,
            },
            {
                label: "6-9 years",
                value: AgeFilter.Above72Months,
            },
            {
                label: "10 years and above",
                value: AgeFilter.Above120Months,
            },
        ],
    },
];

export enum GenderFilter {
    F,
    M,
}

export const GenderFilterOptions = [
    {
        options: [
            {
                label: "Female",
                value: GenderFilter.F,
            },
            {
                label: "Male",
                value: GenderFilter.M,
            }
        ],
    },
];

// TODO: mock for now
export const BreedFilterOptions = [
    {
        options: new Array(50).fill(0).map((_, i) => ({
            label: `Test ${i}`,
            value: i
        }))
    }
];