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

class Company {
    _id: string = '';
    name: string = '';
    address: string = '';
}


class EditVacancyData extends VacancyData {
    company: Company = new Company();
}

class ICompanie {
    company: Company = new Company();
    _id: string = '';
}
// Users cards interfaces
class UserCardData {
    name = '';
}

export { Company, ICompanie, EditVacancyData, VacancyData, wantedSkillsData };
