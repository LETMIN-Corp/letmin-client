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

class CompanyProfileI {
    company: object = {
        name: '',
        cnpj: '',
        email: '',
        phone: '',
        address: '',
        description: '',
    };
    holder: object = {
        name: '',
        cpf: '',
        email: '',
        phone: '',
    };
    plan: object = {
        selected: '',
    };
    card: object = {
        type: '',
        number: '',
        code: '',
        expiration: '',
        owner: '',
    };
    [key: string]: any;
}

export { Company, ICompanie, EditVacancyData, VacancyData, wantedSkillsData, CompanyProfileI };
