
var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $result = document.querySelector('#result')
var $input = document.querySelector('#game-time')
var colors = ['blue', 'red', 'green']

$start.addEventListener('click', startGame)
$game.addEventListener('click', hendlBox)
var butStartGame = true

$input.addEventListener('input', setGameTime)

function startGame() {
    $input.setAttribute('disabled', 'true')
    butStartGame = true
    setGameTime()
    hide($start)
    $game.style.backgroundColor = '#fff';
   
    score = 0

    var interval = setInterval(function() 
    {
        var time = parseFloat($time.textContent)

        if (time <= 0)
        {
            clearInterval(interval)
            endGame()
        //end game
        }
        else
        {
        $time.textContent = (time - 0.1).toFixed(1)
        }

    }, 100)

    renderBox()     
}
function endGame() {
    $input.removeAttribute('disabled', 'false')
    $game.innerHTML = ''
    butStartGame = false
    show($start)
    $game.style.backgroundColor = '#ccc';
    gameScore()
    hide($timeHeader)
    show($resultHeader)
}

function hendlBox(event) {
    if (!butStartGame)
        return
    
    if(event.target.dataset.box)
    {
    score++
    renderBox()
    }
}
function setGameTime() {
    var Time = +$input.value
    $time.textContent = Time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function gameScore() {
    $result.textContent = score.toString()
}

function renderBox() {
    $game.innerHTML = ''
    var gameSize = $game.getBoundingClientRect()
    var box = document.createElement('div')
    var boxSize = vizov(30, 100)
    var maxTop = gameSize.height - boxSize 
    var maxLeft = gameSize.width - boxSize 
    var numberColor = vizov(0, colors.length)

    box.style.position = 'absolute'
    box.style.width = box.style.height = boxSize + 'px'
    box.style.backgroundColor = colors[numberColor]
    box.style.top = vizov(0, maxTop) + 'px'
    box.style.left = vizov(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
   
    box.setAttribute('data-box', 'true')
    $game.insertAdjacentElement('afterbegin', box)
}
function show($el) {
    $el.classList.remove('hide')
}
function hide($el) {
    $el.classList.add('hide')
}

function vizov(min, max) {
return Math.floor(Math.random()*(max-min)+min)
}
