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

export {
    IUserData,
    UserTypedData,
    Iexperience,
    Iformation,
    Iskill,
    BasicUserData,
};