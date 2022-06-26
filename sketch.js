
var tree = [];
var leaves = [];


// These properties are what define the tree and are refered to in the branch class
var randomRotationR;
var randomRotationL;

let rainbowTree;
let autoGenerate;
let stepping;

let lineShrink = 0.75;
let lineWeightShrink = 0.8;

let BranchWeight = 6;
let branchLength = 150;

let rootLength = 300;
        
// GrowSpeed is the devisor of grow direction
// grow dir will be added to the length of the branch growSpeed many times for it to reach full length
let growSpeed = 25;

// Info might not be necessary, have not tried deleting it though
var Info;

let RandomizeEverything = false;
function setup() {
    
    // Initilize the canvas position to the canvas container div
    let canvas = createCanvas(800, 800);
    canvas.parent('canvascontainer');

    stepping = false;
    autoGenerate = false;
    rainbowTree = false;

    // Just making sure it's visible
    display.style.visibility= "visible";
    resetScene();
}






//---------------------------------------------------------------------------------//



function draw() {
    background(51);

    for (let i = 0; i < tree.length; i++) {
        tree[i].show();
        tree[i].update();
        //tree[i].slider+=0.1;
        //tree[i].jitter();
    }

    // Next  and previous value in the array
    // 8191
    // 16383
    
    if (!stepping) {
        if (tree.length <= 8191) {
            BranchGen();
        } else if (autoGenerate) {
            resetScene();
        }  
    } 
    
    

    /*---RENDER LEAVES ARRAY---*/
    for (let i = 0; i < leaves.length; i++) {
        fill(231, 255, 4, 100);
        stroke(100,100)
        ellipse(leaves[i].x, leaves[i].y, 8, 8);

        // falling speed
        leaves[i].y += random(0, 1);
    }



    // Update info html
    rotationRInfo.html(randomRotationR);
    rotationLInfo.html(randomRotationL);

    growSpeedInfo.html(growSpeed);
    branchLengthInfo.html(branchLength);
    strokeWeightInfo.html(BranchWeight);

    shrinkRateInfo.html(lineShrink);
    weightShrinkInfo.html(lineWeightShrink);
    
}



function BranchGen() {
    for (let i = tree.length-1; i >= 0; i--) {
        if (!tree[i].finished && tree[i].grown) {

            // Grab the current stroke weight of the branch in question
            // then feed it into the new branch so it can be altered
            let weight = tree[i].strokeWeight;

            tree.push(tree[i].newBranch(weight, 'right'));
            tree.push(tree[i].newBranch(weight, 'left'));   

            // this here is so the existing branches dont create duplicate branches
            tree[i].finished = true;
        }
        
    }
}


// -------------------------Scene control------------------------------ //

function resetScene() {

    
    tree = [];
    leaves = [];
    // The round function magic thingy gets a number limited to a specific decimal place
    randomRotationR = Math.round(random(12, 3) * 1000) / 1000;
    randomRotationL = Math.round(random(12, 3) * 1000) / 1000;

    
    if (RandomizeEverything) {
        lineShrink = Math.round(random(1, 0.6) * 100) / 100;
        lineWeightShrink = Math.round(random(1, 0.5) * 100) / 100;

        BranchWeight = Math.round(random(20, 0.5) * 100) / 100;
        branchLength = Math.round(random(300, 100) * 100) / 100;

        rootLength = 300;    
    }


    // Create new root
    tree[0] = new Branch(0, 0, 0, true); 
}

// called if W key is pressed
function resetValues() {

    lineShrink = 0.75;
    lineWeightShrink = 0.8;

    BranchWeight = 6;
    branchLength = 150;

    rootLength = 300;
}

// Button functions----------------------------------------------//
function generateTree() {
    if (stepping) {
        BranchGen();
    } else {
        resetScene();
    }
}
function generateLeaves() {
    for (let i = 0; i < tree.length; i++) {
        if (!tree[i].finished) {
            let leaf = tree[i].end.copy();
            leaves.push(leaf);
        }
    }
}

// invert Tree Properties and update status-----------------------------------------------

function RainbowTree() {
    rainbowTree = !rainbowTree;

    if (rainbowTree) {
        RainbowTreeStatus.html("on");
    } else {
        RainbowTreeStatus.html("off");
    }
    
}
function autoGenerateTree() {
    autoGenerate = !autoGenerate;

    if (autoGenerate) {
        autoGenerateStatus.html("on");
    } else {
        autoGenerateStatus.html("off");
    }
}
function toggleStepping() {
    stepping = !stepping;

    if (stepping) {
        toggleSteppingStatus.html("on");
    } else {
        toggleSteppingStatus.html("off");
    }
}






// Modify tree properties ---------------------------------------------------------------

function incVar(num, string, valueString) {
    let addition;
    if(valueString == "BranchWeight") {
        addition = 0.5;
    } else if (valueString == "branchLength") {
        addition = 10;
    } else if (valueString == "lineShrink" || valueString == "lineWeightShrink") {
        addition = 0.05;
    } else if (valueString == "growSpeed") {
        addition = 1;
    }
    if (string == 'dec') {
        num -= addition;
    } else if (string == 'inc') {
        num += addition;
    }
    if (num <= 0) {
        num = addition;
    }
    
    // this will get a number rounded to a specific decimal point
    return Math.round(num * 100) / 100;
}