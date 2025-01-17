#ifndef Utils_hpp
#define Utils_hpp

#include <stdio.h>
#include "ofMain.h"

enum mPosition { M_LEFT, M_RIGHT, M_CENTER };
enum mSign {M_NEGATIVE = -1, M_POSITIVE = 1, M_ZERO = 0};

class MeshUtils {
    
private:
    char _screenshotKey = 's';
    string _name;
    
public:
    void enableScreenshot(string name);
    void enableScreenshot(string name, char key);
    
    void onKeyPressed(ofKeyEventArgs& eventArgs);
    void disableScreenshot();
    void takeScreenshot();
};

ofColor mRandomColor(int opacity);
ofColor mRandomColor();

string mColorToString(ofColor color);

ofVec3f mVectorFromAngle(float angleRads);
float mAngleFromVector(ofVec3f v);

ofVec3f mGetRandomVelocity(float max = 10);

ofRectangle mGetBoundsWithPadding(const ofRectangle & bounds, float padding);
ofVec3f mGetRandomPointInBounds(const ofRectangle & bounds);
ofVec3f mGetRandomPointInBounds(const ofRectangle & bounds, float depth);
vector<ofVec3f> mGetRandomPointsInBounds(const ofRectangle & bounds, uint number);
vector<ofVec3f> mGetRandomPointsInBounds(const ofRectangle & bounds, uint number, float depth);
ofVec3f mGetRandomPointInSphere(ofVec3f center, float radius);
vector<ofVec3f> mGetRandomPointsInSphere(ofVec3f center, float radius, int number);
ofVec3f mGetRandomPointOnSphere(ofVec3f center, float radius);
vector<ofVec3f> mGetRandomPointsOnSphere(ofVec3f center, float radius, int number);

vector<ofVec3f> mGetRandomPointsInCircle(const ofVec3f & center, float radius, uint number);
ofVec3f mGetRandomPointInCircle(const ofVec3f & center, float radius);

ofVec3f mGetWindowCenterPoint();

float mConstrain(float amt, float low, float high);


ofVec3f mGetPointOnCircle(ofVec3f center, float radius, float angle);
ofVec3f mGetRandomPointOnCircle(ofVec3f center, float radius);
ofVec3f mGetPointOnLine(ofVec3f p1, ofVec3f p2, float distance);
ofVec3f mGetPointOnCircleAlongLing(ofVec3f center1, float radius, ofVec3f center2);
float mGetAngleOfLine(ofVec3f p1, ofVec3f p2);

int mFindLeftMostPointIndex(const vector<ofVec3f> & points);

mPosition mGetOrientationOfPointToLine(const ofVec3f & v1, const ofVec3f & v2, const ofVec3f & p);
mSign sign(float n);

vector<ofVec3f> mFindConvexHull(const vector<ofVec3f> & points);

#endif /* Follower_hpp */
