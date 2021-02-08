export function idGen(){
    let id: string = '';

    for(let i: number = 0; i < 7; i++){
        id += Math.floor(Math.random() * 10);
    }

    return id;
}