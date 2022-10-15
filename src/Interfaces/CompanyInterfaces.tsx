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
    yearsOfExperience: number = 0;
    [key: string]: any;
}

export {
    VacancyData,
    wantedSkillsData,
}