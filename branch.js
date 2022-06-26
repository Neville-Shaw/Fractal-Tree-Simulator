

class Branch {
    constructor(begin, end, strokeWeight, isroot) {

        // Noted configs:
        // R = 9, L = 5, LS = 0.8, LWS = 0.8, SW = 5 RL, = 125, BL = 125
        // R = 10, L = 2, LS = 0.8, LWS = 0.8, SW = 5 RL, = 125, BL = 125
        // R = 3, L = 3, LS = 0.8, LWS = 0.8, SW = 5 RL, = 300, BL = 125
        // R = 4, L = 8, LS = 0.8, LWS = 0.8, SW = 5 RL, = 300, BL = 125
        // R = 4, L = 8, LS = 0.75, LWS = 0.8, SW = 5 RL, = 300, BL = 125
        // R = 3.1, L = 8, LS = 0.75, LWS = 0.8, SW = 5 RL, = 300, BL = 125
        // R = 3.1, L = 8, LS = 0.75, LWS = 0.8, SW = 6 RL, = 300, BL = 150


        //this.rotationR = 8;
        //this.rotationL = 8;
        this.rotationR = randomRotationR;
        this.rotationL = randomRotationL;

        // Percentage of the new branch parameter
        // Based on the length of the previous branch
        this.lineShrink = lineShrink;
        this.lineWeightShrink = lineWeightShrink;

        this.strokeWeight = BranchWeight;
        this.branchLength = branchLength;

        this.rootLength = rootLength;
        
        // GrowSpeed is the devisor of grow direction
        // grow dir will be added to the length of the branch this many times to reach full length
        this.growSpeed = growSpeed;
        
        this.isroot = isroot;
        if (!isroot) {
            this.begin = begin;
            this.end = end;
            this.strokeWeight = strokeWeight;
            this.grown = false;
        } else {
            this.begin = createVector(width/2, height - this.rootLength + this.branchLength);
            this.end = createVector(width/2, height - this.rootLength); 
            this.strokeWeight = this.strokeWeight;
            this.grown = true;
        }

        // End of the line, will change as branch grows
        this.endV = createVector(this.begin.x, this.begin.y);

        // GrowDir will be added to endV growRate many times to reach original given end vector
        this.growDir = p5.Vector.sub(this.end, this.begin);
        this.growDir = p5.Vector.div(this.growDir, this.growSpeed);

        // Set to true when branches are generated on the current branch in sketch
        this.finished = false;
        this.RainbowTree = rainbowTree;

        
        // Initilized RGB values for rainbow tree
        this.r = random(255,0);
        this.g = random(255,0);
        this.b = random(255,0);


        // Weighed against growrate and used to limit the lenth of the growing branches
        this.count = 0;
    }


    show() {
        strokeWeight(this.strokeWeight);
        if (this.RainbowTree) {
            stroke(this.r, this.g, this.b);
        } else {
            stroke(200);
        }
        
        // If root is true draw the line to canvasHeight regardless of Begin vector.
        // This is just here to stop the branch lengths from being too long to start out
        // because the branch line lengths are compared to the branch they are generating from.
        if (this.isroot) {
            line(width/2, height, this.end.x, this.end.y);
        } else {
            line(this.begin.x, this.begin.y, this.endV.x, this.endV.y);
        }
        
    }

    update() {
        // Continue to grow the branch unless the branch is either grown or is the root
        if (!this.isroot && !this.grown) {
            this.endV = p5.Vector.add(this.endV, this.growDir);
            this.count++;
            
            // Checks if the branch has grown long enough to reach the original end vector
            if (this.count >= this.growSpeed) {
                this.grown = true;
            } 
        }
    }

    
    newBranch(weight, DIR) {
        // Gets the direction of the branch, shrinks it, rotates it and then adds the original end vector
        // to make the begin vector of the new branch equal to the end vector of the origin branch
        let dir = p5.Vector.sub(this.end, this.begin);

        dir.mult(this.lineShrink);
        let newWeight = weight * this.lineWeightShrink;
        
        if (DIR == 'left') {
            dir.rotate(-PI/this.rotationL); 
        } else if (DIR == 'right') {
            dir.rotate(PI/this.rotationR);
        }
        
        let newEnd = p5.Vector.add(this.end, dir);
        let p = new Branch(this.end, newEnd, newWeight, false);
        return p;

    }


    // Random Effects
    jitter() {
        let a = random(-1,1);
        let b = random(-1,1);

        // this looks ugly but it's more efficient than converting to a vector I think...
        this.end.x += a;
        this.end.y += b;
        this.endV.x += a;
        this.endV.y += b;
    }
}


