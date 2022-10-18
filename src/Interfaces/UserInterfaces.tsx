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

export { BasicUserData, Iexperience, Iformation, Iskill, IUserData, UserCanExclude, UserEditModals, UserTypedData };
