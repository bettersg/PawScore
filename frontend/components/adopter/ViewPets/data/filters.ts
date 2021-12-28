import { Animal } from "@contract";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

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

export const AgeFilterMatcher = new Map<
    AgeFilter,
    (ageMonths: number) => boolean
>([
    [AgeFilter.Above0Months, (ageMonths) => ageMonths >= 0 && ageMonths <= 6],
    [AgeFilter.Above6Months, (ageMonths) => ageMonths >= 7 && ageMonths <= 12],
    [
        AgeFilter.Above12Months,
        (ageMonths) => ageMonths >= 13 && ageMonths <= 36,
    ],
    [
        AgeFilter.Above36Months,
        (ageMonths) => ageMonths >= 37 && ageMonths <= 72,
    ],
    [
        AgeFilter.Above72Months,
        (ageMonths) => ageMonths >= 72 && ageMonths <= 120,
    ],
    [AgeFilter.Above120Months, (ageMonths) => ageMonths >= 121],
]);

export enum GenderFilter {
    F = "F",
    M = "M",
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
            },
        ],
    },
];

function toTitlecase(str: string) {
    return str.replace(/\b\S/g, (t) => t.toUpperCase());
}

export function generateBreedFilterOptions(animals: Animal.Attributes[]) {
    const breeds = animals.reduce((group, animal) => {
        if (animal.breed) {
            group.add(animal.breed.toLowerCase());
        }
        return group;
    }, new Set<string>());

    return [
        {
            options: Array.from(breeds).map((breed) => ({
                label: toTitlecase(breed),
                value: breed,
            })),
        },
    ];
}

export function filterAnimals(
    animals: Animal.Attributes[],
    {
        speciesFilter,
        genderFilter,
        ageFilter,
        breedFilter,
    }: {
        speciesFilter: Animal.Species[];
        genderFilter: GenderFilter[];
        ageFilter: AgeFilter[];
        breedFilter: string[];
    },
) {
    if (
        !speciesFilter.length &&
        !genderFilter.length &&
        !ageFilter.length &&
        !breedFilter.length
    ) {
        return animals;
    }

    const now = dayjs.utc();
    return animals.filter((a) => {
        if (speciesFilter.length && !speciesFilter.includes(a.species)) {
            return false;
        }

        if (
            genderFilter.length &&
            !genderFilter.includes(a.gender as GenderFilter)
        ) {
            return false;
        }

        if (ageFilter.length) {
            if (!a.dateOfBirth) {
                return false;
            }

            const numMonths = now.diff(dayjs.utc(a.dateOfBirth), "month");
            const matchesAgeFilter = ageFilter.some((filter) =>
                AgeFilterMatcher.get(filter)!(numMonths),
            );

            if (!matchesAgeFilter) {
                return false;
            }
        }

        if (breedFilter.length) {
            if (!a.breed || !breedFilter.includes(a.breed.toLowerCase())) {
                return false;
            }
        }

        return true;
    });
}
