'use strict';


let cells = [];
var dragSrcEl;
let canvas, ctx, speed = 4, textX = 0;

window.onload = function() {
    let size = 4;
    document.getElementById('fieldSize').addEventListener('input', function(){
        size = this.value;
    })
    document.getElementById('generateField').addEventListener('click', function(){createField(size)});
    // createField(3);
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
};

function createField(n) {
    let table = document.getElementById('myTable');
    table.innerHTML = "";
    cells = [];
    let row, cell;
    let counter = 0;
    let initialArr = [];
    const mainArr = [];

    for (let i = 1; i < n*n; i++){
        initialArr.push(i);
        mainArr.push(i);
    }
    mixArr(initialArr);
    console.log(initialArr);

    for (let i = 0; i < n; i++) {
        row = table.insertRow(i);
        for(let j = 0; j < n; j ++){
            cell = row.insertCell(j);
            cell.addEventListener('dragstart', handleDragStart, false);
            if (counter < initialArr.length)
            {
                cell.innerHTML = '<div class="item" draggable="true"' + ' id="' + initialArr[counter] + '">'+initialArr[counter] + '</div>';
            } else {
                cell.addEventListener('dragover', handleDragOver, false);
                cell.addEventListener('drop', handleDrop, false);
            }
            cells[counter] = initialArr[counter];
            counter++;
        }
    }
    cells[n*n - 1] = 'empty';
    console.log(cells);

}

function mixArr(arr){
    // randomly mixes the initial array arr
    let randIndex;
    for (let i in arr) {
      let x = arr[i];
        randIndex = Math.floor(Math.random() * arr.length);
        arr[i] = arr[randIndex];
        arr[randIndex] = x;
        // [arr[i], arr[randIndex]] = [arr[randIndex], arr[i]];
    }
}

function handleDragStart(e) {

    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {

    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {

        // меняем поля в массиве, по которому происходит проверка на выигрышь
        let x = parseInt(dragSrcEl.innerText);
        let index = cells.indexOf(x);

        cells[cells.indexOf('empty')] = x;
        cells[index] = 'empty';
        if (won(cells)){
            requestAnimationFrame(animate);
            console.log( "You won!");
        } else {
            console.log("keep trying");
        }
        // обмен содержимого полей которое переносим и на которое переносим
        dragSrcEl.innerHTML = this.innerHTML;
        dragSrcEl.addEventListener('dragover', handleDragOver, false);
        dragSrcEl.addEventListener('drop', handleDrop, false);

        this.innerHTML = e.dataTransfer.getData('text/html');
        this.removeEventListener('dragover', handleDragOver, false);
        this.removeEventListener('drop', handleDrop, false);
    }
    return false;
}

// Проверка выиграл ли игрок
function won(arr) {
    if (arr[arr.length - 1] !== "empty") return;
    for (let i = 0; i < arr.length - 1; i++){
        if (i + 1 == arr[i]){ continue; }
        else { return false;}
    }
    return true;
}

// Анимация после победы
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#CC0013';
    ctx.font = '40pt Arial';
    ctx.fillText('Перамога!', textX, 100, 300);
    ctx.fillStyle = 'red';
    ctx.strokeText('Перамога!', textX, 100, 300);

    // 3 - move the shapes
    textX = textX + speed;
    if((textX + 200 > canvas.width) || (textX <= 0)){
        speed = -speed;
    }

    requestAnimationFrame(animate);
}