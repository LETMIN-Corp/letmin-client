// Vacancy Interfaces
class wantedSkillsData {
    name = '';
    level = '';
}

class VacancyData {
    role = '';
    sector = '';
    description = '';
    salary = '';
    currency = '';
    workload = '';
    region = '';
    type = '';
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
    name = '';
}

export { EditVacancyData, VacancyData, wantedSkillsData };
