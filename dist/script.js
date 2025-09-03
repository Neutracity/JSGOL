"use strict";
function getRandomBool() {
    return !!Math.floor(Math.random() * 2);
}
class Grid {
    constructor() {
        this.height = 100;
        this.width = 100;
        this.div = document.getElementById('grid') || document.createElement('div');
        this.soup = () => {
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    if (getRandomBool()) {
                        this.arr[i][j].change();
                    }
                }
            }
        };
        this.next_iteration = () => {
            let change_array = [];
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    let n = this.get_neighbor(i, j);
                    let c = this.arr[i][j];
                    if (c != null) {
                        if (c.state) {
                            if (n <= 1 || n >= 4) {
                                change_array.push(c);
                            }
                        }
                        else {
                            if (n == 3) {
                                change_array.push(c);
                            }
                        }
                    }
                }
            }
            for (let cell of change_array) {
                cell.change();
            }
        };
        this.play_pause = () => {
            if (this.timer == null) {
                this.timer = setInterval(this.next_iteration, 500);
            }
            else {
                clearInterval(this.timer);
                this.timer = null;
            }
        };
        this.arr = Array(this.width);
        this.div.style.setProperty('--grid-rows', this.height.toString());
        this.div.style.setProperty('--grid-cols', this.width.toString());
        for (let index = 0; index < this.arr.length; index++) {
            let t = Array(this.height);
            for (let j = 0; j < t.length; j++) {
                t[j] = new Cell();
                this.div.appendChild(t[j].div);
            }
            this.arr[index] = t;
        }
        let button = document.createElement("button");
        button.addEventListener("click", this.next_iteration, false);
        button.innerText = "Next iteration";
        document.body.appendChild(button);
        let button2 = document.createElement("button");
        button2.addEventListener("click", this.soup, false);
        button2.innerText = "Soup";
        document.body.appendChild(button2);
        let b = document.createElement("button");
        b.addEventListener("click", () => {
            for (let i = 0; i < this.height; i++) {
                for (let j = 0; j < this.width; j++) {
                    this.arr[i][j].dead();
                }
            }
        }, false);
        b.innerText = "clear";
        document.body.appendChild(b);
        let button3 = document.createElement("button");
        button3.addEventListener("click", this.play_pause, false);
        button3.innerText = "Play / Pause";
        document.body.appendChild(button3);
    }
    add(x, y) {
        this.arr[x][y].alive();
    }
    remove(x, y) {
        this.arr[x][y].dead();
    }
    get_neighbor(x, y) {
        let c = 0;
        for (let i = x - 1; i < x + 2; i++) {
            for (let j = y - 1; j < y + 2; j++) {
                if (!(i < 0 || j < 0 || i >= this.height || j >= this.width)) {
                    if (!(i == x && j == y)) {
                        if (this.arr[i][j].state) {
                            c++;
                        }
                    }
                }
            }
        }
        return c;
    }
}
class Cell {
    constructor() {
        this.div = document.createElement('div');
        this.state = false;
        this.change = () => {
            if (this.state) {
                this.dead();
            }
            else {
                this.alive();
            }
        };
        this.div.className = 'cell';
        this.div.addEventListener("click", this.change, false);
        this.div.style.backgroundColor = 'black';
    }
    alive() {
        this.div.style.backgroundColor = 'white';
        this.state = true;
    }
    dead() {
        this.div.style.backgroundColor = 'black';
        this.state = false;
    }
}
const g = new Grid();
