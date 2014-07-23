void drawCircle(Point p, float radius) {
	ellipse(p.x, p.y, radius * 2, radius * 2);
}

Point getRandomPoint(int padding) {
	return new Point(random(padding, width - padding), random(padding, height - padding));
}

class Point {

	float x = 0.0;
	float y = 0.0;

	Point (float x, float y) {
		this.x = x;
		this.y = y;
	}

	Point () {
	}
}