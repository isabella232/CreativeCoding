/*
    Copyright Mike Chambers 2018
    mikechambers@gmail.com

    http://www.mikechambers.com
    https://github.com/mikechambers/CreativeCoding

    Released un an MIT License
    https://github.com/mikechambers/CreativeCoding/blob/master/LICENSE.txt
*/

#include "ofApp.h"

#include "ofxSyphonClient.h"
#include "MeshUtils.h"
#include "ColorPaletteManager.h"
#include "ColorPalette.h"
#include "Swatch.h"


MeshUtils utils;
ofxSyphonServer syphon;

string APP_NAME = ofFilePath::getFileName(ofFilePath::getCurrentExePath());

ofRectangle bounds;

bool paused = false;


ColorPaletteManager cpm;
ColorPalette cp;

ofVec3f center;
bool animateDown = true;

//vector<Swatch> swatches;
vector<shared_ptr<Swatch>> swatches;

//--------------------------------------------------------------
void ofApp::setup(){
    utils.enableScreenshot(APP_NAME, 's');
    syphon.setName(APP_NAME);

    bounds = ofGetWindowRect();
    center = bounds.getCenter();
    
    ofSetBackgroundAuto(true);
    ofSetBackgroundColor(ofColor::white);
    
    init();
}

void ofApp::init() {
    
    swatches.clear();
    cp = cpm.getRandomColorPalette();
    
    int len = cp.getSize();
    for(int i = 0; i < len; i++) {
        
        shared_ptr<Swatch> s(new Swatch());
        
        s->color = cp.getColorAtIndex(i);
        
        ofVec3f destination;
        
        float xPos = (center.x - ((len - i) * s->width) + (s->width * len) / 2);
        if(animateDown) {
            s->position.y = -(s->height);
            destination.y = center.y;
        } else {
            s->position.y = bounds.height;
            destination.y = center.y;
        }

        
        s->position.x = xPos;
        destination.x = xPos;
        
        s->setDestination(destination);
        
        s->start(i * 150,  500);
        
        swatches.push_back(s);
    }
}

bool in = true;

//--------------------------------------------------------------
void ofApp::update(){
    if(paused) {
        return;
    }

    bool complete = true;
    for(auto & swatch : swatches) {
        swatch->update();
        
        if(!swatch->isCompleted()) {
            complete = false;
        }
    }
    
    if(complete){
        animateDown = !animateDown;
        init();
    }
    
    
}

//--------------------------------------------------------------
void ofApp::draw(){
    if(paused) {
        syphon.publishScreen();
        return;
    }
    
    ofVec3f center = bounds.getCenter();
    int side = 50;
    
    ofFill();
    
    for(auto & swatch : swatches) {
        ofSetColor(swatch->color);
        ofDrawRectangle(swatch->position, swatch->height, swatch->width);
    }
    syphon.publishScreen();
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    if(key == ' ') {
        paused = !paused;
    } else if (key == 'n') {
        init();
    }
}


//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
