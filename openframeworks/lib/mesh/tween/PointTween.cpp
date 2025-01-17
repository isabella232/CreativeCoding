//
//  Tween.cpp
//  EasingPlay
//
//  Created by Mike Chambers on 4/26/18.
//

#include "PointTween.h"

void PointTween::setTween(ofVec3f startPosition,
                       ofVec3f endPosition,
                       int duration,
                       ofxeasing::Function tweenGroup,
                          ofxeasing::Type tweenType,
                       int delay){
    
    _startPosition = startPosition;
    _lastPosition = _startPosition;
    _destination = endPosition;
    _duration = duration;
    _tweenGroup = tweenGroup;
    _tweenType = tweenType;
    _currentPosition = _startPosition;
    
    if(delay) {
        _delay = delay;
    }
}

void PointTween::start() {
    _tweenIsCompleted = false;
    
    _tweenHasBeenStarted = true;
    if(_delay > 0) {
        _timeToStart = ofGetElapsedTimeMillis() + _delay;
        
        return;
    }

    _startTime = ofGetElapsedTimeMillis();
}

void PointTween::update() {
    
    //todo: might not need this, but have incase events order
    //is weird
    if(_tweenIsCompleted) {
        return;
    }
    
    if(!_tweenHasBeenStarted) {
        return;
    }
    
    if(_delay != -1) {
        if(ofGetElapsedTimeMillis() >= _timeToStart) {
            _delay = -1;
            start();
        }
        return;
    }

    int endTime = _startTime + _duration;
    if(
       (ofGetElapsedTimeMillis() > endTime) &&
       !_onTweenCompleteSent) {
        
        _currentPosition = _destination;

        _tweenIsCompleted = true;
        ofNotifyEvent(onTweenComplete, _tweenIsCompleted);
        _onTweenCompleteSent = true;
        return;
    }
    
    float t = ofGetElapsedTimeMillis() - _startTime;
    float d = _duration;

    ofxeasing::function func = ofxeasing::easing(_tweenGroup, _tweenType);

    _lastPosition = _currentPosition;
    
    _currentPosition.x = func(t,
                        _startPosition.x,
                        _destination.x  - _startPosition.x,
                        d);
    
    _currentPosition.y = func(t,
                        _startPosition.y,
                        _destination.y - _startPosition.y,
                        d);
}

bool PointTween::tweenIsCompleted() {
    return _tweenIsCompleted;
}

ofVec3f PointTween::getCurrentPosition() {
    return _currentPosition;
}

ofVec3f PointTween::getStartPosition() {
    return  _startPosition;
}

ofVec3f PointTween::getDestination() {
    return  _destination;
}

ofVec3f PointTween::getLastPosition() {
    return _lastPosition;
}
