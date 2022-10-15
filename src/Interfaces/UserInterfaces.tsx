class Iskill {
    name: string = '';
    level: string = '';
}

class Iformation {
    name: string = '';
    institution: string = '';
    start: string = '';
    finish: string = '';
    description: string = '';
}

class Iexperience {
    role: string = '';
    company: string = '';
    start: string = '';
    finish: string = '';
    description: string = '';
}

class BasicUserData {
    createdAt: string = '';
    name: string = '';
    role: string = '';
    description: string = '';
    email: string = '';
    username: string = '';
    picture: string = '';
}

class IUserData extends BasicUserData {
    skills: Array<Iskill> = [ new Iskill() ];
    experiences: Array<Iexperience> = [ new Iexperience() ];
    formations: Array<Iformation> = [ new Iformation() ];
    [key: string]: any;
}

class UserTypedData extends BasicUserData {
    experience: Iexperience = new Iexperience();
    formation: Iformation = new Iformation();
    skill: Iskill = new Iskill();
    [key: string]: any;
}

class UserCanExclude {
    experiences: boolean = false;
    formations: boolean = false;
    skills: boolean = false;
}

class UserEditModals {
    experience: boolean = false;
    formation: boolean = false;
    skill: boolean = false;
    exit: boolean = false;
    save: boolean = false;
    delete: boolean = false; 
}

export {
    IUserData,
    UserTypedData,
    Iexperience,
    Iformation,
    Iskill,
    BasicUserData,
    UserCanExclude,
    UserEditModals,
};