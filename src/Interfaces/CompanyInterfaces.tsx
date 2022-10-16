// Vacancy Interfaces
class wantedSkillsData {
    name: string = '';
    level: string = '';
}

class VacancyData {
    role: string = '';
    sector: string = '';
    description: string = '';
    salary: string = '';
    currency: string = '';
    workload: string = '';
    region: string = '';
    type: string = '';
    wantedSkills: Array<wantedSkillsData> = [];
    yearsOfExperience: number | string = '';
    [key: string]: any;
}

// Users cards interfaces
class UserCardData {
    name: string = '';
}

export {
    VacancyData,
    wantedSkillsData,
}