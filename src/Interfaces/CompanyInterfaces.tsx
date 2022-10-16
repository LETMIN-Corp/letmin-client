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

interface Company {
    _id: string;
    name: string;
}

class EditVacancyData extends VacancyData {
    company: Company = {
        _id: '',
        name: '',
    };
}

// Users cards interfaces
class UserCardData {
    name: string = '';
}

export {
    VacancyData,
    EditVacancyData,
    wantedSkillsData,
}