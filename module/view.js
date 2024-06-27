export default class View{
    gameView;
    mapView;

    constructor(){
        this.gameView = document.querySelector("#game");
        this.mapView = this.gameView.querySelector('#map');
    }

    render(game){
        for (let row = 0; row < game.map.positions.length; row++) {
            const columns = game.map.positions[row];
            let rowElement = document.createElement('ul');
            for (let column = 0; column < columns.length; column++) {
                const item = columns[column];
                let columnElement = document.createElement('li');
                columnElement.innerText = item;
                rowElement.appendChild(columnElement);
            }
            this.mapView.appendChild(rowElement);
        }
        this.gameView.classList.add(game.status);
    }

    update(game){
        let rowIndex = 0;
        document.querySelectorAll("ul").forEach(row => {
            let columnIndex = 0;
            row.querySelectorAll("li").forEach(column => {
                let item = game.map.positions[rowIndex][columnIndex];
                column.innerText = item;
                columnIndex++;
            });
            rowIndex++;
        });
        
        if (!this.gameView.classList.contains(game.status)) {
            this.gameView.classList.forEach(c=>this.gameView.classList.remove(c));
            this.gameView.classList.add(game.status);
        }
    }
}