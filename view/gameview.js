class GameView{
    game = document.querySelector('#game')
    title;
    map;

    constructor(){
        this.title = document.createElement('h2');
        this.map = document.createElement('div');

        this.game.appendChild(this.title);
        this.game.appendChild(this.map);
    }
    
    setTitle(title){
        this.title.innerText = title;
    }

    renderMap(positions){

        for (let row = 0; row < positions.length; row++) {
            let mapRow = document.createElement('ul');
            for (let column = 0; column < positions[row].length; column++) {
                let mapColumn = document.createElement('li');
                mapColumn.classList.add(positions[row][column]);
                mapRow.appendChild(mapColumn);
            }
            this.map.appendChild(mapRow);
        }
        
    }

    updateMap(positions){

        let row = 0;
        document.querySelectorAll('ul').forEach(mapRow => {
            let column = 0;
            mapRow.querySelectorAll('li').forEach(mapColumn =>{
                mapColumn.classList.forEach(c=>mapColumn.classList.remove(c));
                mapColumn.classList.add(positions[row][column]);
                column++;
            });
            row++;
        });
    }
}

export default GameView;