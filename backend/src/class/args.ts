class args extends Array {
    collection = new Map();

    constructor(array: Array<any>) {
        super(0);

        array.forEach((v, i) => {
            this.push(v.value ? v.value : v);

            if (v.name) {
                this.collection.set(v.name, v.value);
            }
        });
    }

    get(key:string) {
        return this.collection.get(key);
    }
}

export default args;