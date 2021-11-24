export class Person {
    id: number = Math.floor(Math.random() * (100 + 1));
    name: string
    surname: string
    username: string
    email: string
    gender: string
    
    constructor(name:string, surname:string, username:string, email:string, gender:string) {
        this.name = name,
        this.surname = surname,
        this.username = username,
        this.email = email,
        this.gender = gender
    }
}