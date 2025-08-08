
class Grid {
    arr : Array<Array<Boolean>>;
    height : number = 10;
    width : number = 10;

    constructor(){
        this.arr = Array<Array<Boolean>>(this.width);
        for (let index = 0; index < this.arr.length; index++) {
            let t = Array<Boolean>(this.height);
            for (let j = 0; j < t.length; j++) {
                t[j] = false;
                
            }
            this.arr[index] = t;
        }
    }

    /**
     * add
     */
    public add(x: number, y: number) {
        this.arr[x][y] = true;
    }

    public remove(x: number, y: number) {
        this.arr[x][y] = false;
    }

    public get_neighbor(x: number, y: number){
        let c = 0;
        for (let i = x-1; i < x+2; i++) {
            for (let j = y-1; j < y+2; j++) {
                if (!(i == x && j == y)){
                    if(this.arr[i][j]){
                        c++;
                    }
                    
                }
            }
        }
        return c;
    }
}


const g = new Grid();

g.add(0,0);
g.add(1,0);
g.add(2,0);
g.add(2,1);

console.log(g.arr);
console.log(g.get_neighbor(1,1));


