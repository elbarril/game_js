export default class View{
    view;

    constructor(){
        this.view = document.querySelector("#game");
    }

    render(map){
        for (let row = 0; row < map.positions.length; row++) {
            const columns = map.positions[row];
            let rowElement = document.createElement('ul');
            for (let column = 0; column < columns.length; column++) {
                const item = columns[column];
                let columnElement = document.createElement('li');
                columnElement.innerText = item;
                rowElement.appendChild(columnElement);
            }
            this.view.appendChild(rowElement);
        }
    }

    update(map){
        let rowIndex = 0;
        document.querySelectorAll("ul").forEach(row => {
            let columnIndex = 0;
            row.querySelectorAll("li").forEach(column => {
                let item = map.positions[rowIndex][columnIndex];
                column.innerText = item;
                columnIndex++;
            });
            rowIndex++;
        });
    }
}