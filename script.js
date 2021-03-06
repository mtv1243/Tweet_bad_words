// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries -->

//API Keys
const FIREBASE_API_KEY = config.FIREBASE_API_KEY;
const FIREBASE_APP_ID = config.FIREBASE_APP_ID;


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "type-bad-words.firebaseapp.com",
    databaseURL: "https://type-bad-words.firebaseio.com",
    projectId: "type-bad-words",
    storageBucket: "type-bad-words.appspot.com",
    messagingSenderId: "419696050106",
    appId: FIREBASE_APP_ID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



let ScoresReference = firebase.database();
let scoresRef = ScoresReference.ref('scores');

//get snapshot of the scores database
scoresRef.once('value').then(function(snapshot) {
  let highScores = [];
  let fbScores = snapshot.val();
  for (let key in fbScores){
    highScores.push(fbScores[key].score)
  }

  //arrange the high scores in descending order
  highScores.sort((num1, num2)=>{return (num2-num1)});

  //insert the first 5 high scores into the page
  for (let i = 0; i<5; i++){
    let elementHS = document.querySelector('.hs' + i);
    elementHS.innerHTML = 'redacted: ' + highScores[i];
  }
});
/*==========================================
 */

 /*=========== strikethrough delay ========*/

 let strikethrough = document.querySelector('h1 > span');
 let delayStrikethrough=()=>{
   setTimeout(()=>{
     console.log('delay');
     strikethrough.classList.add('strikethrough');
   }, 500)
 };
// delayStrikethrough();

//Constants
const SUBSTRACTION_TIME = 0.01;
const SCORE_FACTOR = 10;
const INTERVAL_FACTOR = 10;
const LEVEL_FACTOR = 1000;
const UNITY_FACTOR = 1;
const BASE_FACTOR = 2;
//base facter was 2
//HTML Elements Javascript Variables
let elementScore;
let elementInputWord;
let elementStartButton;
let elementRestartButton;
let elementLevel;
let elementCountDown;
let elementTitleWord;
let elementRandomWord;
let elementMessage;
let elementCandidates;
let elementTweetText;
let elementCandidateOL;
let $modal;
// Variables
let seconds = 0;
let cancel;
let option;
let level = 1;
let wordsCount = 0;
let remainingTime;
let score = 0;

let words = [
  'domestic security',
  'assassination', 'emergency management', 'gangs', 'attack', 'emergency response', 'national security',
  'domestic security', 'first responder', 'state of emergency', 'drill', 'homeland security',
  'security', 'exercise', 'maritime domain awareness', 'breach', 'cops', 'threat', 'law enforcement', 'national preparedness', 'standoff', 'authorities', 'initiative', 'swat', 'disaster assistance',
  'militia', 'screening', 'disaster management', 'shooting', 'lockdown', 'domestic nuclear', 'shots fired', 'bomb squad', 'threat detection office', 'evacuation', 'crash', 'national preparedness', 'deaths', 'looting', 'mitigation', 'hostage', 'riot', 'prevention', 'explosion', 'explosive', 'emergency landing', 'response', 'police', 'pipe bomb', 'recovery', 'disaster medical assistance team', 'incident dirty bomb', 'facility', 'domestic nuclear detection', 'organized crime', 'hazmat', 'leak', 'gas',
  'nuclear', 'biological infection spillover', 'chemical spill', 'biological event', 'anthrax', 'suspicious package', 'suspicious device', 'chemical', 'blister agent', 'toxic', 'chemical burn',
  'chemical agent', 'national laboratory', 'biological', 'exposure', 'nuclear facility', 'epidemic', 'burn', 'nuclear threat', 'hazardous', 'nerve agent', 'cloud', 'hazardous material incident', 'ricin',
  'plume', 'industrial spill', 'sarin', 'radiation', 'infection', 'north korea', 'radioactive', 'white powder', 'health concern', 'outbreak', 'salmonella', 'agriculture', 'contamination', 'small pox',
  'listeria', 'exposure', 'plague', 'symptoms', 'virus', 'human to human', 'mutation', 'evacuation',
  'human to animal', 'resistant', 'bacteria', 'influenza', 'antiviral', 'recall', 'center for disease control', 'wave', 'ebola', 'cdc', 'pandemic', 'food poisoning', 'drug administration', 'fda', 'infection', 'foot and mouth', 'public health', 'water borne', 'air borne', 'h5ni', 'toxic', 'sick',
  'avian', 'agro terror', 'swine flu', 'tuberculosis', 'tb', 'pork', 'strain', 'tamiflu', 'world health organization', 'quarantine', 'norovirus', 'who', 'h1n1', 'epidemic', 'viral', 'hemorrhagic fever', 'vaccine', 'e coli', 'infrastructure security', 'airplane', 'airport', 'chemical fire', 'cikr',
  'critical infrastructure', 'subway', 'electric', 'key resources', 'bart', 'failure', 'outage', 'amtrak', 'marta', 'black out', 'collapse', 'port authority', 'brown out', 'computer infrastructure',
  'nbic', 'national biosurveillance integration center', 'port communications', 'dock', 'infrastructure', 'bridge', 'telecommunications', 'transportation security', 'cancelled', 'grid', 'delays', 'national infrastructure', 'power', 'service disruption', 'metro', 'smart', 'power lines',
  'wiviata', 'body scanner', 'southwest border violence', 'drug cartel', 'fort hancock', 'gunfight', 'violence', 'san diego', 'trafficking', 'gang', 'ciudad juarez', 'kidnap', 'drug', 'nogales', 'calderon', 'narcotics', 'sonora', 'reyosa', 'cocaine', 'colombia', 'bust', 'marijuana', 'mara salvatrucha', 'tamaulipas', 'heroin', 'ms is', 'ms-13', 'meth lab', 'border', 'drug war', 'drug trade',
  'mexico', 'mexican army', 'illegal immigrants', 'cartel', 'methamphetamine', 'smuggling', 'smugglers', 'southwest', 'cartel de golfo', 'matamoros', 'juarez', 'gulf cartel', 'michoacana', 'sinaloa', 'la familia', 'guzman', 'tijuana', 'reynosa', 'arellano-felix', 'tonvon', 'nuevo leon', 'beltran-leyva',
  'yuma', 'narcos', 'barrio azteca', 'tucson', 'narco banners', 'artistic assassins', 'decapitated', 'mexicles', 'u.s. consulate', 'los zetas', 'new federation', 'consular', 'shootout', 'el paso',
  'execution', 'terrorism', 'ied', 'suspicious substance', 'al qaeda', 'aqap', 'arabian peninsula',
  'terror', 'abu sayyaf', 'attack', 'hamas', 'aqim', 'iraq', 'farc', 'armed revolutionary forces colombia', 'islamic maghreb', 'afghanistan', 'tip', 'tehrik-i-taliban', 'iran', 'ira', 'irish republican army', 'pakistan', 'eta', 'euskadi to askatasuna', 'yemen', 'agro', 'basque separatists', 'pirates',
  'environmental terrorist', 'hezbollah', 'extremism', 'eco terrorism', 'tamil tigers', 'somalia', 'conventional weapon', 'plf', 'palestine liberation front', 'nigeria', 'target', 'radicals', 'weapons grade', 'plo', 'palestine liberation organization', 'al-shabaab', 'dirty bomb', 'home grown',
  'enriched', 'car bomb', 'plot', 'nuclear', 'jihad', 'nationalist', 'chemical weapon', 'taliban',
  'recruitment', 'biological weapon', 'weapons cache', 'fundamentalism', 'ammonium nitrate', 'suicide bomber', 'islamist', 'improvised explosive device', 'suicide attack', 'weather', 'disaster',
  'emergency', 'ice mud slide', 'mudslide hurricane', 'stranded', 'stuck', 'erosion', 'tornado', 'help',
  'power outage', 'twister', 'hail', 'brown out', 'tsunami', 'wildfire', 'warning', 'earthquake', 'tsunami warning center', 'watch', 'tremor', 'magnitude', 'lightening', 'flood', 'avalanche', 'aid', 'storm', 'typhoon', 'relief', 'crest', 'shelter-in-place', 'closure', 'temblor', 'disaster',
  'interstate', 'extreme weather', 'snow', 'burst', 'forest fire', 'blizzard', 'emergency broadcast system', 'brush fire', 'sleet', 'cyber security', '2600', 'hacker', 'botnet', 'spammer', 'china',
  'ddos', 'dedicated denial of service', 'phishing', 'conficker', 'service', 'rootkit', 'worm', 'denial of service', 'phreaking', 'scanners', 'malware', 'cain and abel', 'social media', 'virus', 'brute forcing', 'trojan', 'mysql injection', 'keylogger', 'cyber attack', 'cyber command', 'cyber terror'
];
let previousWords = [];
let maxWords = words.length;

function init(evt) {
  elementScore = document.querySelector('#score');
  elementInputWord = document.querySelector('#inputWord');
  elementStartButton = document.querySelector('#startButton');
  elementLevel = document.querySelector('#level');
  elementCountDown = document.querySelector('#countDown');
  elementRestartButton = document.querySelector('#restartButton');
  elementTitleWord = document.querySelector('#titleWord');
  elementRandomWord = document.querySelector('#randomWord');
  elementMessage = document.querySelector('#message');
  elementCandidates = document.querySelector('.element-candidates');
  elementTweetText = document.querySelector('.tweet-text');
  elementCandidateOL = document.querySelector('.candidate-ol');
  $modal = $('#modal');
  //
  elementStartButton.addEventListener('click', startGame);
  elementRestartButton.addEventListener('click', restartGame);
  elementRestartButton.style.display = "block";
  elementRestartButton.style.visibility = "hidden";
}

function startGame(evt) {
  // if the wordsCount is multiple of maxWords (words.length), restart the previousWords array
  if (wordsCount % maxWords === 0) {
    previousWords.length = 0;
  }
  // Iterate until to get a word that is not repeated, each words.length words
  do {
    option = Math.floor(Math.random() * words.length);
  }
  while (previousWords.includes(words[option]));

  hideHeaders();
  setItems();
  setCountDown();
  revealCandidates();
  elementScore.innerHTML = "Score: " + score;
  elementLevel.innerHTML = "Level: " + level;
  elementCountDown.classList.remove("progressBar");
  void elementCountDown.offsetWidth;
  elementCountDown.classList.add("progressBar");
  elementCountDown.style.animationDuration = seconds + 0.5 + "s"
  elementTitleWord.innerHTML = 'Type the Word: ';
  elementRandomWord.innerHTML = words[option];
  elementRandomWord.style.color = "red";
  // elementInputWord.addEventListener('input', validateWord);
  elementInputWord.addEventListener('keyup', validateWord);
}

function restartGame(evt) {
  level = 1;
  seconds = 0;
  remainingTime = 0;
  wordsCount = 0;
  score = 0;
  elementInputWord.disabled = false;
  elementRestartButton.style.visibility = "hidden";
  elementMessage.innerHTML = '';
  startGame();
  resetCandidates();
  $modal.slideToggle();
}

function hideHeaders() {
  document.querySelector('h1').style.display = "none";
  document.querySelector('h2').style.display = "none";
  document.querySelector('.explanation').style.display = 'none';
}

function setCountDown(evt) {
  cancel = setInterval(function() {
    remainingTime -= SUBSTRACTION_TIME;
    if (remainingTime <= 0) {
      stopCountDown();
      elementMessage.innerHTML = 'GAME OVER';
      elementInputWord.value = '';
      elementInputWord.disabled = true;
      elementRestartButton.style.visibility = "visible";
      //stores the score in firebase
      storeScore(score);
      // generate the tweet text
      generateTweet();
      $modal.slideToggle();
    }
  }, INTERVAL_FACTOR);
}

function setItems() {
  //My own formula to calculate the seconds for each word depending its length
  seconds = words[option].length / (UNITY_FACTOR + ((level / SCORE_FACTOR) * BASE_FACTOR));
  remainingTime = seconds;
  elementInputWord.style.display = "block";
  elementInputWord.focus();
  elementStartButton.style.display = "none";
}

function stopCountDown() {
  clearInterval(cancel);
}

function validateWord(evt) {
  let lowerInput = evt.target.value.toLowerCase();
  if (lowerInput === words[option]) {
  // if (evt.target.value === words[option]) {
    stopCountDown();
    wordsCount++;
    score = Math.round(score + ((remainingTime + wordsCount) * SCORE_FACTOR))
    if (score >= (level * LEVEL_FACTOR)) {
      level++;
      elementLevel.innerHTML = "Level: " + level;
    }
    previousWords.push(words[option]);
    // console.log('previous words: ' + previousWords);
    elementScore.innerHTML = "Score: " + score;
    evt.target.value = '';
    startGame();
  }
}

window.onload = init;

function storeScore(firebase_score) {
  scoresRef.push({
    score: firebase_score
  })
}

//get candidates from pro publica
fetch("https://api.propublica.org/campaign-finance/v1/2018/candidates/leaders/pac-total.json", {
    headers: {
        'X-API-Key': config.PRO_PUB_API_KEY
    }
}).then((res)=>{
    return res.json();
}).then((data)=>{
    let candList = data.results
    console.log(candList);
    // console.log(data.results);
    candList.forEach((index)=>{
      let party = index.party.charAt(0);
      let pacMoney = index.total_from_pacs;
      let pacMoneyCommas = ' $' + numberWithCommas(pacMoney);
      let name = index.name;
      let fullName = name.split(',');
      let fName =  fullName[1] + ' ';
      fName = fName.replace('MR.', '');
      let lName =  fullName[0] + ' (' + party + ')';
      let candidate = (fName + lName).toUpperCase();
      generateWrapper(candidate, pacMoneyCommas);
    })

    //reveal dollar amount when user clicks candidate name
    let elementCandidates = document.querySelector('.element-candidates');
    elementCandidates.addEventListener('click', (event)=>{
      let target = event.target;
      console.log(target.nextSibling);
      if(target.className === 'candidate') {
        target.nextSibling.classList.remove('hidden');
      }
    })
});

//format the dollar amount to have commas every three digits
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//create list item for each candidate to inhabit
function generateWrapper(name, money) {
  let candWrapper = document.createElement('li');
  candWrapper.setAttribute('class', 'candidate-wrapper hidden');
  candWrapper.innerHTML = generateCandidate(name, money);
  elementCandidateOL.append(candWrapper);
}

function generateCandidate(name, money) {
  let html = '<p class="candidate">' + name +
             ':</p>' +
             '<span class="pac-money hidden">' + money +
             '</span>';
  return html;
}

function resetCandidates(){
  candList.forEach((index)=>{
    index.classList.add('hidden');
  })
}

//reveal candidates as user socre increases
let candCounter = 0;
let candList;
function revealCandidates() {
    candList = document.querySelectorAll('.candidate-wrapper');
    candCounter = (Math.floor((score-500) / 500)) + 1;
    // console.log(candList[(candCounter + 1)]);
    if(candList[(candCounter)]) {
      console.log('candCounter is ' + candCounter);
      candList[candCounter].classList.remove('hidden');
      congratulate()
      return candCounter;
  } else {
    console.log('you win! candCounter is ' + candCounter);
  }
}

//congratulate the user...or not
function congratulate() {
  let numOfCandidates = document.querySelector('.num-of-candidates');
  if(score === 0){
    numOfCandidates.innerHTML = 'Umm...you scored 0. Everything all right?';
  } else {
    numOfCandidates.innerHTML = 'Great job! You scored high enough to reveal ' + (candCounter+1) + ' candidate(s)!';
  }
}

// //twitter code
function generateTweet() {
  //stringify the words user typed
  let previousWordsStr = previousWords.toString();
  let previousWordsStrReplaced = previousWordsStr.replace(/,/g, ', ');
  tweetWords = previousWordsStrReplaced.substring(0, 241);
  let tweetText = 'These words were typed by redacted: ' + tweetWords + '...';
  elementTweetText.innerHTML = tweetText;
  console.log(tweetText);
}

//lucky semicolon, don't touch
//;
