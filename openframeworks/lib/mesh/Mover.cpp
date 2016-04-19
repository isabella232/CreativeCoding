//
//  Mover.cpp
//  Persistence
//
//  Created by Mike Chambers on 4/17/16.
//
//

#include "Mover.h"

Mover::Mover() {
    velocity = ofVec3f(0.0, 0.0, 0.0);
    location = ofVec3f(0.0, 0.0, 0.0);
}

void Mover::update() {
    location += velocity;
    
    if(location.x < bounds2d.x || location.x > bounds2d.width) {
        velocity.x *= -1;
    }
    
    if(location.y < bounds2d.y || location.y > bounds2d.height) {
        velocity.y *= -1;
    }
}

void Mover::setBounds(ofRectangle bounds) {
    bounds2d = bounds;
}

void Mover::setToRandomLocation() {
    location.set(ofRandomWidth(), ofRandomHeight());
}

void Mover::setToRandomVelocity(float max) {
    
    float s1 = (ofRandom(1) > 0.5)? max : -1;
    float s2 = (ofRandom(1) > 0.5)? max : -1;
    float s3 = (ofRandom(1) > 0.5)? max : -1;
    float s4 = (ofRandom(1) > 0.5)? max : -1;
    
    velocity.set(ofRandom(-max, max), ofRandom(-max, max));
}