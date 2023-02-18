class Animal {

    constructor(nbPaws) {
        this.paws = nbPaws;
    }

    // getter
    getPaws() {
        return this.paws;
    }

    // setter
    setPaws(nb) {
        this.paws = nb;
    }

    /**
     * @returns {{id: number, name: string}}
     */
    getObject() {

        return {
            id: 1,
            name: 'Coucou'
        }
    }




}

const animal = new Animal(5);
console.log(animal.getPaws());
animal.setPaws(10);
console.log(animal.getPaws());

const obj = animal.getObject();
obj.

