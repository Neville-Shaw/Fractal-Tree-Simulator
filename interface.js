function preload() {

  // BUTTONS!!
  generate = select('#Generate');
  rainbowTree = select('#Rainbow');
  autoGenerate = select('#AutoGenerate');
  stepping = select('#Stepping');

  // Grab display by getElement to allow for stye changes by javascript
  toggleInfo = document.getElementById('infoID');
  Info = document.getElementById('infoID');
  display = document.getElementById('display');
  controls = document.getElementById('Controls');

  // Grab info html
  rotationRInfo = select('#rotationR');
  rotationLInfo= select('#rotationL');
  growSpeedInfo = select('#growSpeed');
  branchLengthInfo = select('#branchLength');
  strokeWeightInfo = select('#strokeWeight');
  shrinkRateInfo = select('#shrinkRate');
  weightShrinkInfo = select('#weightShrink');

  // Button status text
  RainbowTreeStatus = select('#RainbowStatus');
  autoGenerateStatus = select('#AutoGenerateStatus');
  toggleSteppingStatus = select('#ToggleSteppingStatus');

  // toggle stats
  toggleInfo = select('#showInfo');
  toggleControls = select('#showControls');

  // If the buttons were pressed execute these functions
  generate.mousePressed(generateTree);
  rainbowTree.mousePressed(RainbowTree);
  autoGenerate.mousePressed(autoGenerateTree);
  stepping.mousePressed(toggleStepping);

  toggleInfo.mousePressed(displayInfo);
  toggleControls.mousePressed(showControls);
}

function keyPressed() {
  // WOW! look at alll those controls
  if (key == 'B') {
      BranchGen();
  }
  if (key == 'M') {
      resetScene();
  } 
  if (key == 'L') {
      generateLeaves();
  } 
  if (key == 'K') {
      leaves = [];
  } 
  if (key == 'H') {
      displayInfo();
  } 
  if (key == 'T') {
      toggleStepping();
  } 
  if (key == 'C') {
      showControls();
  }
  if (key == 'A') {
      autoGenerateTree();
  } 
  if (key == 'R') {
      RainbowTree();
  }
  if (key == 'G') {
      generateTree();
  }
  if (key == 'W') {
      resetValues();
  }
  
  if (key == ' ') {
      hideAll();
  } 

  // Increase/Decrease tree properties ---------------------------------------
  if (key == '1') {
      growSpeed = incVar(growSpeed, 'dec', 'growSpeed');
  }
  if (key == '2') {
      growSpeed = incVar(growSpeed, 'inc', 'growSpeed');
  }
  // branchLength
  if (key == '3') {
      branchLength = incVar(branchLength, 'dec', 'branchLength');
  }
  if (key == '4') {
      branchLength = incVar(branchLength, 'inc', 'branchLength');
  }

  // BranchWeight
  if (key == '5') {
      BranchWeight = incVar(BranchWeight, 'dec', 'BranchWeight');
  }
  if (key == '6') {
      BranchWeight = incVar(BranchWeight, 'inc', 'BranchWeight');
  }

  // lineShrink
  if (key == '7') {
      lineShrink = incVar(lineShrink, 'dec', 'lineShrink');
  }
  if (key == '8') {
      lineShrink = incVar(lineShrink, 'inc', 'lineShrink');
  }
  
  // lineWeightShrink
  if (key == '9') {
      lineWeightShrink = incVar(lineWeightShrink, 'dec', 'lineWeightShrink');
  }
  if (key == '0') {
      lineWeightShrink = incVar(lineWeightShrink, 'inc', 'lineWeightShrink');
  }


  // Allows to randomize all the values in resetScene method
  if (key == 'Q') {
      RandomizeEverything = !RandomizeEverything
  }
}

function displayInfo() {
  if (Info.style.display != "none") {
      Info.style.display= "none";
      controls.style.display= "none";
  } else {
      Info.style.display= "revert"; 
  }
 
}
// called when the show button is pressed
function showControls() {
  if (controls.style.display != "none") {
      controls.style.display= "none";
  } else {
      controls.style.display= "revert"; 
  }
}
// Cant just set visibility for all of them to hidden because I found that it would be too slow
// setting display to none is faster
function hideAll() {
  if (display.style.display != "none") {
      display.style.display= "none";
      Info.style.visibility= "hidden";
      controls.style.display= "none";
  } else {
      display.style.display= "revert";
      Info.style.visibility= "visible"; 
  }
}