// User profile edit
class Iskill {
    name = '';
    level = '';
}

class Iformation {
    name = '';
    institution = '';
    start = '';
    finish = '';
    description = '';
}

class Iexperience {
    role = '';
    company = '';
    start = '';
    finish = '';
    description = '';
}

class BasicUserData {
    createdAt = '';
    name = '';
    role = '';
    description = '';
    email = '';
    username = '';
    picture = '';
}

class IUserData extends BasicUserData {
    skills: Array<Iskill> = [new Iskill()];
    experiences: Array<Iexperience> = [new Iexperience()];
    formations: Array<Iformation> = [new Iformation()];
    phone: string = '';
    [key: string]: any;
}

class UserTypedData extends BasicUserData {
    experience: Iexperience = new Iexperience();
    formation: Iformation = new Iformation();
    skill: Iskill = new Iskill();
    [key: string]: any;
}

class UserCanExclude {
    experiences = false;
    formations = false;
    skills = false;
}

class UserEditModals {
    experience = false;
    formation = false;
    skill = false;
    exit = false;
    save = false;
    delete = false;
}

class ICompany {
    name: string = '';
    _id: string = '';
}

class VacancyData {
    _id: string = '';
    role: string = '';
    sector: string = '';
    description: string = '';
    company: ICompany = new ICompany();
    salary: string = '';
    currency: string = '';
    workload: string = '';
    type: string = '';
    region: string = '';
    user_applied: boolean = false;
}

export { BasicUserData, Iexperience, Iformation, Iskill, IUserData, UserCanExclude, UserEditModals, UserTypedData, VacancyData };
